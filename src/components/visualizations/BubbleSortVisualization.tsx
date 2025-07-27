import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BubbleSortVisualizationProps {
  isPlaying: boolean;
}

const BubbleSortVisualization: React.FC<BubbleSortVisualizationProps> = ({ isPlaying }) => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [operation, setOperation] = useState('');

  useEffect(() => {
    if (isPlaying) {
      startBubbleSort();
    } else {
      resetVisualization();
    }
  }, [isPlaying]);

  const resetVisualization = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setCurrentStep(0);
    setComparing([]);
    setSorted([]);
    setOperation('');
  };

  const startBubbleSort = () => {
    const steps: Array<{
      array: number[];
      comparing: number[];
      sorted: number[];
      operation: string;
    }> = [];
    
    let arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing step
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          operation: `Comparing ${arr[j]} and ${arr[j + 1]}`
        });
        
        if (arr[j] > arr[j + 1]) {
          // Swap step
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          
          steps.push({
            array: [...arr],
            comparing: [],
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            operation: `Swapped ${arr[j]} and ${arr[j + 1]}`
          });
        }
      }
      
      if (!swapped) {
        steps.push({
          array: [...arr],
          comparing: [],
          sorted: Array.from({ length: n }, (_, idx) => idx),
          operation: 'Array is sorted!'
        });
        break;
      }
    }
    
    // Play through the steps
    steps.forEach((step, index) => {
      setTimeout(() => {
        setArray(step.array);
        setComparing(step.comparing);
        setSorted(step.sorted);
        setOperation(step.operation);
        setCurrentStep(index);
      }, index * 1000);
    });
  };

  const getElementColor = (index: number) => {
    if (comparing.includes(index)) {
      return '#ef4444'; // Red for comparing
    }
    if (sorted.includes(index)) {
      return '#10b981'; // Green for sorted
    }
    return '#3b82f6'; // Blue for normal
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
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="font-semibold text-red-800">Comparing</div>
          <div className="text-red-600">Red elements being compared</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="font-semibold text-green-800">Sorted</div>
          <div className="text-green-600">Green elements in final position</div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualization; 