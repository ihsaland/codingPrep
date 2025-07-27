import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InsertionSortVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface ArrayElement {
  value: number;
  index: number;
  sorted: boolean;
  current: boolean;
  comparing: boolean;
}

const InsertionSortVisualization: React.FC<InsertionSortVisualizationProps> = ({ isPlaying, onReset }) => {
  const [array, setArray] = useState<ArrayElement[]>([
    { value: 64, index: 0, sorted: false, current: false, comparing: false },
    { value: 34, index: 1, sorted: false, current: false, comparing: false },
    { value: 25, index: 2, sorted: false, current: false, comparing: false },
    { value: 12, index: 3, sorted: false, current: false, comparing: false },
    { value: 22, index: 4, sorted: false, current: false, comparing: false },
    { value: 11, index: 5, sorted: false, current: false, comparing: false },
    { value: 90, index: 6, sorted: false, current: false, comparing: false },
    { value: 88, index: 7, sorted: false, current: false, comparing: false }
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [operation, setOperation] = useState<string>('');

  const operations = [
    { type: 'start', delay: 1000 },
    { type: 'insert', index: 1, delay: 2000 },
    { type: 'insert', index: 2, delay: 3000 },
    { type: 'insert', index: 3, delay: 4000 },
    { type: 'complete', delay: 5000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < operations.length) {
          const op = operations[currentStep];
          setOperation(op.type);
          
          if (op.type === 'start') {
            startSort();
          } else if (op.type === 'insert' && op.index !== undefined) {
            performInsertion(op.index);
          } else if (op.type === 'complete') {
            completeSort();
          }
          
          currentStep++;
        } else {
          // setIsPlaying(false);
        }
      }, operations[currentStep]?.delay || 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const startSort = () => {
    setArray(prev => prev.map((el, index) => ({
      ...el,
      sorted: index === 0,
      current: index === 1,
      comparing: false
    })));
    setCurrentIndex(1);
  };

  const performInsertion = (index: number) => {
    setCurrentIndex(index);
    setArray(prev => prev.map((el, i) => ({
      ...el,
      current: i === index,
      comparing: i < index && i >= index - 1
    })));
    
    // Simulate insertion by moving the element to the correct position
    setTimeout(() => {
      setArray(prev => {
        const newArray = [...prev];
        const currentValue = newArray[index].value;
        let insertIndex = index;
        
        // Find the correct position
        for (let i = index - 1; i >= 0; i--) {
          if (newArray[i].value > currentValue) {
            newArray[i + 1] = newArray[i];
            insertIndex = i;
          } else {
            break;
          }
        }
        
        // Update the array with the inserted element
        newArray[insertIndex] = { ...newArray[insertIndex], value: currentValue };
        
        // Mark elements as sorted
        return newArray.map((el, i) => ({
          ...el,
          sorted: i <= index,
          current: false,
          comparing: false
        }));
      });
    }, 500);
  };

  const completeSort = () => {
    setArray(prev => prev.map(el => ({
      ...el,
      sorted: true,
      current: false,
      comparing: false
    })));
  };

  const resetVisualization = () => {
    setArray([
      { value: 64, index: 0, sorted: false, current: false, comparing: false },
      { value: 34, index: 1, sorted: false, current: false, comparing: false },
      { value: 25, index: 2, sorted: false, current: false, comparing: false },
      { value: 12, index: 3, sorted: false, current: false, comparing: false },
      { value: 22, index: 4, sorted: false, current: false, comparing: false },
      { value: 11, index: 5, sorted: false, current: false, comparing: false },
      { value: 90, index: 6, sorted: false, current: false, comparing: false },
      { value: 88, index: 7, sorted: false, current: false, comparing: false }
    ]);
    setCurrentIndex(1);
    setOperation('');
    onReset();
  };

  const handleStep = () => {
    if (currentIndex < array.length) {
      performInsertion(currentIndex);
      setCurrentIndex(prev => prev + 1);
    } else {
      completeSort();
      setCurrentIndex(1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Insertion Sort Visualization</h3>
        
        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Step Through</label>
            <button
              onClick={handleStep}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
            >
              Next Step
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Index</label>
            <div className="px-4 py-2 bg-gray-100 rounded-md text-sm">
              {currentIndex}
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

        {/* Array Visualization */}
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-md font-medium mb-2">Array Elements</h4>
            <div className="flex justify-center space-x-2">
              {array.map((element, index) => (
                <motion.div
                  key={index}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                    element.sorted
                      ? 'bg-green-500'
                      : element.current
                      ? 'bg-blue-500'
                      : element.comparing
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {element.value}
                </motion.div>
              ))}
            </div>
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
                Start with second element
              </li>
              <li className="text-blue-600 font-medium">
                Insert into sorted portion
              </li>
              <li className="text-blue-600 font-medium">
                Shift elements as needed
              </li>
            </ol>
          </div>
          
          {/* Complexity Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Time Complexity</div>
              <div className="font-mono">O(n²)</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Space Complexity</div>
              <div className="font-mono">O(1)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertionSortVisualization; 