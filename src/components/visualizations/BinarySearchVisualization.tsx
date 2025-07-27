import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BinarySearchVisualizationProps {
  isPlaying: boolean;
}

const BinarySearchVisualization: React.FC<BinarySearchVisualizationProps> = ({ isPlaying }) => {
  const [array, setArray] = useState([1, 3, 5, 7, 9, 11, 13, 15]);
  const [target, setTarget] = useState(7);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(7);
  const [middle, setMiddle] = useState<number | null>(null);
  const [found, setFound] = useState<number | null>(null);
  const [operation, setOperation] = useState('');

  useEffect(() => {
    if (isPlaying) {
      startBinarySearch();
    } else {
      resetVisualization();
    }
  }, [isPlaying]);

  const resetVisualization = () => {
    setArray([1, 3, 5, 7, 9, 11, 13, 15]);
    setTarget(7);
    setLeft(0);
    setRight(7);
    setMiddle(null);
    setFound(null);
    setOperation('');
  };

  const startBinarySearch = () => {
    const steps: Array<{
      left: number;
      right: number;
      middle: number | null;
      found: number | null;
      operation: string;
    }> = [];
    
    let l = 0;
    let r = array.length - 1;
    let m: number;
    let foundIndex: number | null = null;
    
    while (l <= r) {
      m = Math.floor((l + r) / 2);
      
      steps.push({
        left: l,
        right: r,
        middle: m,
        found: null,
        operation: `Middle = (${l} + ${r}) / 2 = ${m}, Array[${m}] = ${array[m]}`
      });
      
      if (array[m] === target) {
        foundIndex = m;
        steps.push({
          left: l,
          right: r,
          middle: m,
          found: m,
          operation: `Found ${target} at index ${m}!`
        });
        break;
      } else if (array[m] < target) {
        l = m + 1;
        steps.push({
          left: l,
          right: r,
          middle: null,
          found: null,
          operation: `${array[m]} < ${target}, search right half`
        });
      } else {
        r = m - 1;
        steps.push({
          left: l,
          right: r,
          middle: null,
          found: null,
          operation: `${array[m]} > ${target}, search left half`
        });
      }
    }
    
    if (foundIndex === null) {
      steps.push({
        left: l,
        right: r,
        middle: null,
        found: null,
        operation: `${target} not found in array`
      });
    }
    
    // Play through the steps
    steps.forEach((step, index) => {
      setTimeout(() => {
        setLeft(step.left);
        setRight(step.right);
        setMiddle(step.middle);
        setFound(step.found);
        setOperation(step.operation);
      }, index * 1500);
    });
  };

  const getElementColor = (index: number) => {
    if (found !== null && index === found) {
      return '#10b981'; // Green for found
    }
    if (middle !== null && index === middle) {
      return '#f59e0b'; // Orange for middle
    }
    if (index >= left && index <= right) {
      return '#3b82f6'; // Blue for search range
    }
    return '#9ca3af'; // Gray for outside range
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2">
        {array.map((value, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 1,
              backgroundColor: getElementColor(index),
              color: 'white'
            }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-sm"
          >
            {value}
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-600">
        Searching for: <span className="font-bold text-purple-600">{target}</span>
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

      <div className="grid grid-cols-4 gap-4 text-sm">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="font-semibold text-green-800">Found</div>
          <div className="text-green-600">Green = target found</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="font-semibold text-orange-800">Middle</div>
          <div className="text-orange-600">Orange = current middle</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="font-semibold text-blue-800">Range</div>
          <div className="text-blue-600">Blue = search range</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="font-semibold text-gray-800">Excluded</div>
          <div className="text-gray-600">Gray = excluded</div>
        </div>
      </div>
    </div>
  );
};

export default BinarySearchVisualization; 