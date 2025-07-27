import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QuickSortVisualizationProps {
  isPlaying: boolean;
}

const QuickSortVisualization: React.FC<QuickSortVisualizationProps> = ({ isPlaying }) => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [pivot, setPivot] = useState<number | null>(null);
  const [partitioning, setPartitioning] = useState<number[]>([]);
  const [operation, setOperation] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      startQuickSort();
    } else {
      resetVisualization();
    }
  }, [isPlaying]);

  const resetVisualization = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setPivot(null);
    setPartitioning([]);
    setOperation('');
    setCurrentStep(0);
  };

  const startQuickSort = () => {
    const steps: Array<{
      array: number[];
      pivot: number | null;
      partitioning: number[];
      operation: string;
    }> = [];
    
    let arr = [...array];
    
    // Step 1: Choose pivot
    const pivotIndex = Math.floor(arr.length / 2);
    const pivotValue = arr[pivotIndex];
    
    steps.push({
      array: [...arr],
      pivot: pivotValue,
      partitioning: [],
      operation: `Choose pivot: ${pivotValue}`
    });
    
    // Step 2: Partition around pivot
    const left: number[] = [];
    const right: number[] = [];
    const equal: number[] = [];
    
    arr.forEach((value, index) => {
      if (value < pivotValue) {
        left.push(value);
      } else if (value > pivotValue) {
        right.push(value);
      } else {
        equal.push(value);
      }
      
      steps.push({
        array: [...arr],
        pivot: pivotValue,
        partitioning: [index],
        operation: `Partitioning: ${value} ${value < pivotValue ? '<' : value > pivotValue ? '>' : '='} ${pivotValue}`
      });
    });
    
    // Step 3: Combine results
    const sorted = [...left, ...equal, ...right];
    
    steps.push({
      array: sorted,
      pivot: null,
      partitioning: [],
      operation: 'Combined: [left] + [pivot] + [right]'
    });
    
    // Play through the steps
    steps.forEach((step, index) => {
      setTimeout(() => {
        setArray(step.array);
        setPivot(step.pivot);
        setPartitioning(step.partitioning);
        setOperation(step.operation);
        setCurrentStep(index);
      }, index * 1200);
    });
  };

  const getElementColor = (index: number) => {
    if (pivot !== null && array[index] === pivot) {
      return '#f59e0b'; // Orange for pivot
    }
    if (partitioning.includes(index)) {
      return '#ef4444'; // Red for partitioning
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

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="font-semibold text-orange-800">Pivot</div>
          <div className="text-orange-600">Orange element is pivot</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="font-semibold text-red-800">Partitioning</div>
          <div className="text-red-600">Red elements being partitioned</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="font-semibold text-blue-800">Normal</div>
          <div className="text-blue-600">Blue elements in original position</div>
        </div>
      </div>
    </div>
  );
};

export default QuickSortVisualization; 