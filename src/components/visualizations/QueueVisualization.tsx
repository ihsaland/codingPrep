import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QueueVisualizationProps {
  isPlaying: boolean;
}

const QueueVisualization: React.FC<QueueVisualizationProps> = ({ isPlaying }) => {
  const [queue, setQueue] = useState([3, 7, 1, 9]);
  const [operation, setOperation] = useState('');

  useEffect(() => {
    if (isPlaying) {
      // Simulate queue operations
      setTimeout(() => {
        setOperation('Enqueue 5');
        setQueue([...queue, 5]);
      }, 1000);
      
      setTimeout(() => {
        setOperation('Dequeue');
        setQueue(queue.slice(1));
      }, 3000);
    }
  }, [isPlaying]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="flex space-x-2">
            {queue.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-16 h-8 bg-green-500 text-white rounded flex items-center justify-center font-mono text-sm"
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

export default QueueVisualization; 