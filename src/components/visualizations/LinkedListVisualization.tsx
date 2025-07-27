import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LinkedListVisualizationProps {
  isPlaying: boolean;
}

const LinkedListVisualization: React.FC<LinkedListVisualizationProps> = ({ isPlaying }) => {
  const [nodes, setNodes] = useState([{ value: 3, next: 1 }, { value: 7, next: 2 }, { value: 1, next: 3 }, { value: 9, next: null }]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      // Simulate traversal
      let current = 0;
      const interval = setInterval(() => {
        setHighlightedIndex(current);
        current = (current + 1) % nodes.length;
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, nodes.length]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center space-x-4">
        {nodes.map((node, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              animate={{ 
                scale: highlightedIndex === index ? 1.1 : 1,
                backgroundColor: highlightedIndex === index ? '#3b82f6' : '#e5e7eb',
                color: highlightedIndex === index ? 'white' : '#374151'
              }}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
            >
              {node.value}
            </motion.div>
            {index < nodes.length - 1 && (
              <div className="flex items-center mx-2">
                <div className="w-8 h-0.5 bg-gray-400"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-600">
        Linked List: Each node points to the next node
      </div>
    </div>
  );
};

export default LinkedListVisualization; 