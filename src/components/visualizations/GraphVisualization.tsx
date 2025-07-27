import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GraphVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface Node {
  id: string;
  x: number;
  y: number;
  visited: boolean;
}

interface Edge {
  from: string;
  to: string;
  weight?: number;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ isPlaying, onReset }) => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'A', x: 100, y: 100, visited: false },
    { id: 'B', x: 200, y: 150, visited: false },
    { id: 'C', x: 150, y: 200, visited: false },
    { id: 'D', x: 300, y: 100, visited: false },
    { id: 'E', x: 250, y: 250, visited: false }
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 3 },
    { from: 'C', to: 'E', weight: 5 },
    { from: 'D', to: 'E', weight: 1 }
  ]);
  const [operation, setOperation] = useState<string>('');
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [newNodeId, setNewNodeId] = useState<string>('');
  const [newEdgeFrom, setNewEdgeFrom] = useState<string>('');
  const [newEdgeTo, setNewEdgeTo] = useState<string>('');
  const [newEdgeWeight, setNewEdgeWeight] = useState<string>('');

  const operations = [
    { type: 'dfs', startNode: 'A', delay: 1000 },
    { type: 'bfs', startNode: 'A', delay: 3000 },
    { type: 'add_node', nodeId: 'F', delay: 5000 },
    { type: 'add_edge', from: 'B', to: 'E', weight: 2, delay: 7000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < operations.length) {
          const op = operations[currentIndex];
          setOperation(op.type);
          
          if (op.type === 'dfs' && op.startNode) {
            performDFS(op.startNode);
          } else if (op.type === 'bfs' && op.startNode) {
            performBFS(op.startNode);
          } else if (op.type === 'add_node' && op.nodeId) {
            addNode(op.nodeId);
          } else if (op.type === 'add_edge' && op.from && op.to) {
            addEdge(op.from, op.to, op.weight);
          }
          
          currentIndex++;
        } else {
          // setIsPlaying(false);
        }
      }, operations[currentIndex]?.delay || 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const performDFS = (startNode: string) => {
    const visited = new Set<string>();
    const stack = [startNode];
    const path: string[] = [];
    
    const dfsStep = () => {
      if (stack.length > 0) {
        const current = stack.pop()!;
        if (!visited.has(current)) {
          visited.add(current);
          path.push(current);
          setHighlightedNodes([...path]);
          
          // Add unvisited neighbors
          const neighbors = edges
            .filter(edge => edge.from === current || edge.to === current)
            .map(edge => edge.from === current ? edge.to : edge.from)
            .filter(node => !visited.has(node));
          
          stack.push(...neighbors);
        }
        
        if (stack.length > 0) {
          setTimeout(dfsStep, 500);
        }
      }
    };
    
    dfsStep();
  };

  const performBFS = (startNode: string) => {
    const visited = new Set<string>();
    const queue = [startNode];
    const path: string[] = [];
    
    const bfsStep = () => {
      if (queue.length > 0) {
        const current = queue.shift()!;
        if (!visited.has(current)) {
          visited.add(current);
          path.push(current);
          setHighlightedNodes([...path]);
          
          // Add unvisited neighbors
          const neighbors = edges
            .filter(edge => edge.from === current || edge.to === current)
            .map(edge => edge.from === current ? edge.to : edge.from)
            .filter(node => !visited.has(node));
          
          queue.push(...neighbors);
        }
        
        if (queue.length > 0) {
          setTimeout(bfsStep, 500);
        }
      }
    };
    
    bfsStep();
  };

  const addNode = (nodeId: string) => {
    const newNode: Node = {
      id: nodeId,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      visited: false
    };
    setNodes(prev => [...prev, newNode]);
  };

  const addEdge = (from: string, to: string, weight?: number) => {
    const newEdge: Edge = { from, to, weight };
    setEdges(prev => [...prev, newEdge]);
  };

  const handleAddNode = () => {
    if (newNodeId && !nodes.find(n => n.id === newNodeId)) {
      addNode(newNodeId);
      setNewNodeId('');
    }
  };

  const handleAddEdge = () => {
    if (newEdgeFrom && newEdgeTo && newEdgeWeight) {
      addEdge(newEdgeFrom, newEdgeTo, parseInt(newEdgeWeight));
      setNewEdgeFrom('');
      setNewEdgeTo('');
      setNewEdgeWeight('');
    }
  };

  const resetVisualization = () => {
    setNodes(prev => prev.map(node => ({ ...node, visited: false })));
    setHighlightedNodes([]);
    setOperation('');
    setNewNodeId('');
    setNewEdgeFrom('');
    setNewEdgeTo('');
    setNewEdgeWeight('');
    onReset();
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Graph Operations</h3>
        
        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Add Node</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Node ID"
                value={newNodeId}
                onChange={(e) => setNewNodeId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleAddNode}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
              >
                Add Node
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Add Edge</label>
            <div className="grid grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="From"
                value={newEdgeFrom}
                onChange={(e) => setNewEdgeFrom(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="To"
                value={newEdgeTo}
                onChange={(e) => setNewEdgeTo(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="number"
                placeholder="Weight"
                value={newEdgeWeight}
                onChange={(e) => setNewEdgeWeight(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleAddEdge}
                className="px-4 py-2 bg-secondary-600 text-white rounded-md text-sm hover:bg-secondary-700"
              >
                Add Edge
              </button>
            </div>
          </div>
        </div>

        {/* Graph Visualization */}
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
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2}
                    textAnchor="middle"
                    dy="-5"
                    className="text-xs fill-gray-600"
                  >
                    {edge.weight}
                  </text>
                </motion.g>
              );
            })}
          </svg>
          
          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer ${
                highlightedNodes.includes(node.id)
                  ? 'bg-green-500'
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
        
        {/* Reset Button */}
        <div className="mt-4">
          <button
            onClick={resetVisualization}
            className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization; 