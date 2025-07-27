import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TreeVisualizationProps {
  isPlaying: boolean;
}

const TreeVisualization: React.FC<TreeVisualizationProps> = ({ isPlaying }) => {
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      // Simulate tree traversal
      const nodes = [1, 2, 3, 4, 5, 6, 7];
      let current = 0;
      const interval = setInterval(() => {
        setHighlightedNode(nodes[current]);
        current = (current + 1) % nodes.length;
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative">
          {/* Root */}
          <motion.div
            animate={{ 
              scale: highlightedNode === 1 ? 1.1 : 1,
              backgroundColor: highlightedNode === 1 ? '#3b82f6' : '#e5e7eb',
              color: highlightedNode === 1 ? 'white' : '#374151'
            }}
            className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm mx-auto"
          >
            1
          </motion.div>
          
          {/* Level 1 */}
          <div className="flex justify-center space-x-8 mt-4">
            <motion.div
              animate={{ 
                scale: highlightedNode === 2 ? 1.1 : 1,
                backgroundColor: highlightedNode === 2 ? '#3b82f6' : '#e5e7eb',
                color: highlightedNode === 2 ? 'white' : '#374151'
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
            >
              2
            </motion.div>
            <motion.div
              animate={{ 
                scale: highlightedNode === 3 ? 1.1 : 1,
                backgroundColor: highlightedNode === 3 ? '#3b82f6' : '#e5e7eb',
                color: highlightedNode === 3 ? 'white' : '#374151'
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
            >
              3
            </motion.div>
          </div>
          
          {/* Level 2 */}
          <div className="flex justify-center space-x-4 mt-4">
            <motion.div
              animate={{ 
                scale: highlightedNode === 4 ? 1.1 : 1,
                backgroundColor: highlightedNode === 4 ? '#3b82f6' : '#e5e7eb',
                color: highlightedNode === 4 ? 'white' : '#374151'
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
            >
              4
            </motion.div>
            <motion.div
              animate={{ 
                scale: highlightedNode === 5 ? 1.1 : 1,
                backgroundColor: highlightedNode === 5 ? '#3b82f6' : '#e5e7eb',
                color: highlightedNode === 5 ? 'white' : '#374151'
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
            >
              5
            </motion.div>
            <motion.div
              animate={{ 
                scale: highlightedNode === 6 ? 1.1 : 1,
                backgroundColor: highlightedNode === 6 ? '#3b82f6' : '#e5e7eb',
                color: highlightedNode === 6 ? 'white' : '#374151'
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
            >
              6
            </motion.div>
            <motion.div
              animate={{ 
                scale: highlightedNode === 7 ? 1.1 : 1,
                backgroundColor: highlightedNode === 7 ? '#3b82f6' : '#e5e7eb',
                color: highlightedNode === 7 ? 'white' : '#374151'
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
            >
              7
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        Binary Tree: Each node has at most two children
      </div>
    </div>
  );
};

export default TreeVisualization; 