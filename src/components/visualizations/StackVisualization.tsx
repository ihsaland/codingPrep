import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StackVisualizationProps {
  isPlaying: boolean;
}

const StackVisualization: React.FC<StackVisualizationProps> = ({ isPlaying }) => {
  const [stack, setStack] = useState([3, 7, 1, 9]);
  const [operation, setOperation] = useState('');

  useEffect(() => {
    if (isPlaying) {
      // Simulate stack operations
      setTimeout(() => {
        setOperation('Push 5');
        setStack([...stack, 5]);
      }, 1000);
      
      setTimeout(() => {
        setOperation('Pop');
        setStack(stack.slice(0, -1));
      }, 3000);
    }
  }, [isPlaying]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="space-y-2">
            {stack.map((value, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-16 h-8 bg-blue-500 text-white rounded flex items-center justify-center font-mono text-sm"
              >
                {value}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {operation && (
        <div className="text-center text-sm text-gray-600">
          {operation}
        </div>
      )}
    </div>
  );
};

export default StackVisualization; 