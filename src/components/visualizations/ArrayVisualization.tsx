import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ArrayVisualizationProps {
  isPlaying: boolean;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ isPlaying }) => {
  const [array, setArray] = useState([3, 7, 1, 9, 4, 6]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [operation, setOperation] = useState<string>('');

  useEffect(() => {
    if (isPlaying) {
      startAnimation();
    }
  }, [isPlaying]);

  const startAnimation = () => {
    // Simulate array operations
    const operations = [
      { type: 'access', index: 2, delay: 1000 },
      { type: 'search', value: 9, delay: 2000 },
      { type: 'insert', value: 8, index: 3, delay: 3000 },
      { type: 'delete', index: 1, delay: 4000 },
    ];

    operations.forEach((op, i) => {
      setTimeout(() => {
        setOperation(op.type);
        if (op.type === 'access' || op.type === 'delete') {
          if (op.index !== undefined) {
            setHighlightedIndex(op.index);
          }
        } else if (op.type === 'search') {
          // Search animation
          for (let j = 0; j < array.length; j++) {
            setTimeout(() => {
              setHighlightedIndex(j);
              if (array[j] === op.value) {
                setOperation(`Found ${op.value} at index ${j}`);
              }
            }, j * 500);
          }
        } else if (op.type === 'insert') {
          const newArray = [...array];
          if (op.index !== undefined && op.value !== undefined) {
            newArray.splice(op.index, 0, op.value);
            setArray(newArray);
            setHighlightedIndex(op.index);
          }
        }
      }, op.delay);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2">
        {array.map((value, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: highlightedIndex === index ? 1.1 : 1,
              opacity: 1,
              backgroundColor: highlightedIndex === index ? '#3b82f6' : '#e5e7eb',
              color: highlightedIndex === index ? 'white' : '#374151'
            }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
          >
            {value}
          </motion.div>
        ))}
      </div>
      
      {operation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-gray-600 bg-gray-100 rounded-lg p-2"
        >
          {operation}
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="font-semibold text-blue-800">Access: O(1)</div>
          <div className="text-blue-600">Direct access by index</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="font-semibold text-green-800">Search: O(n)</div>
          <div className="text-green-600">Linear search required</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="font-semibold text-yellow-800">Insertion: O(n)</div>
          <div className="text-yellow-600">Shifting elements needed</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="font-semibold text-red-800">Deletion: O(n)</div>
          <div className="text-red-600">Shifting elements needed</div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualization; 