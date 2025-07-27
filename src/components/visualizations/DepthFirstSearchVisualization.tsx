import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DepthFirstSearchVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface GraphNode {
  id: string;
  x: number;
  y: number;
  visited: boolean;
  current: boolean;
  stack: boolean;
}

interface GraphEdge {
  from: string;
  to: string;
}

const DepthFirstSearchVisualization: React.FC<DepthFirstSearchVisualizationProps> = ({ isPlaying, onReset }) => {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 'A', x: 100, y: 100, visited: false, current: false, stack: false },
    { id: 'B', x: 200, y: 150, visited: false, current: false, stack: false },
    { id: 'C', x: 150, y: 200, visited: false, current: false, stack: false },
    { id: 'D', x: 300, y: 100, visited: false, current: false, stack: false },
    { id: 'E', x: 250, y: 250, visited: false, current: false, stack: false }
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'E' }
  ]);
  const [operation, setOperation] = useState<string>('');
  const [visitedOrder, setVisitedOrder] = useState<string[]>([]);

  const resetVisualization = () => {
    setNodes(prev => prev.map(node => ({
      ...node,
      visited: false,
      current: false,
      stack: false
    })));
    setVisitedOrder([]);
    setOperation('');
    onReset();
  };

  const performDFS = () => {
    setOperation('dfs_start');
    const visited = new Set<string>();
    const stack: string[] = ['A'];
    const order: string[] = [];
    
    const dfsStep = () => {
      if (stack.length === 0) {
        setOperation('dfs_complete');
        return;
      }
      
      const current = stack.pop()!;
      if (!visited.has(current)) {
        visited.add(current);
        order.push(current);
        setVisitedOrder([...order]);
        
        // Update node states
        setNodes(prev => prev.map(node => ({
          ...node,
          current: node.id === current,
          visited: visited.has(node.id),
          stack: stack.includes(node.id)
        })));
        
        // Add unvisited neighbors to stack
        const neighbors = edges
          .filter(edge => edge.from === current || edge.to === current)
          .map(edge => edge.from === current ? edge.to : edge.from)
          .filter(node => !visited.has(node));
        
        stack.push(...neighbors);
        
        setTimeout(dfsStep, 1000);
      } else {
        setTimeout(dfsStep, 500);
      }
    };
    
    dfsStep();
  };

  const handleStep = () => {
    performDFS();
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Depth-First Search Visualization</h3>
        
        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start DFS</label>
            <button
              onClick={handleStep}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
            >
              Start DFS
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Visited Order</label>
            <div className="px-4 py-2 bg-gray-100 rounded-md text-sm">
              {visitedOrder.join(' → ') || 'None'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Reset</label>
            <button
              onClick={resetVisualization}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Graph Visualization */}
        <div className="space-y-4">
          <div className="relative h-80 border border-gray-300 rounded-lg bg-gray-50">
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full">
              {edges.map((edge, index) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                
                if (!fromNode || !toNode) return null;
                
                return (
                  <motion.g key={index}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="#6B7280"
                      strokeWidth="2"
                    />
                  </motion.g>
                );
              })}
            </svg>
            
            {/* Nodes */}
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  node.current
                    ? 'bg-red-500'
                    : node.visited
                    ? 'bg-green-500'
                    : node.stack
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`}
                style={{ left: node.x - 16, top: node.y - 16 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {node.id}
              </motion.div>
            ))}
          </div>
          
          {/* Current Operation Display */}
          {operation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <span className="text-sm font-medium text-blue-800">
                Current Operation: {operation}
              </span>
            </motion.div>
          )}
          
          {/* Algorithm Steps */}
          <div className="space-y-2">
            <h4 className="text-md font-medium">Algorithm Steps</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li className="text-blue-600 font-medium">
                Start at root node
              </li>
              <li className="text-blue-600 font-medium">
                Explore as deep as possible
              </li>
              <li className="text-blue-600 font-medium">
                Backtrack when no more options
              </li>
            </ol>
          </div>
          
          {/* Complexity Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Time Complexity</div>
              <div className="font-mono">O(V + E)</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Space Complexity</div>
              <div className="font-mono">O(V)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepthFirstSearchVisualization; 