import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeapSortVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface ArrayElement {
  value: number;
  index: number;
  sorted: boolean;
  heapified: boolean;
  extracting: boolean;
}

const HeapSortVisualization: React.FC<HeapSortVisualizationProps> = ({ isPlaying, onReset }) => {
  const [array, setArray] = useState<ArrayElement[]>([
    { value: 64, index: 0, sorted: false, heapified: false, extracting: false },
    { value: 34, index: 1, sorted: false, heapified: false, extracting: false },
    { value: 25, index: 2, sorted: false, heapified: false, extracting: false },
    { value: 12, index: 3, sorted: false, heapified: false, extracting: false },
    { value: 22, index: 4, sorted: false, heapified: false, extracting: false },
    { value: 11, index: 5, sorted: false, heapified: false, extracting: false },
    { value: 90, index: 6, sorted: false, heapified: false, extracting: false },
    { value: 88, index: 7, sorted: false, heapified: false, extracting: false }
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [operation, setOperation] = useState<string>('');

  const resetVisualization = () => {
    setArray([
      { value: 64, index: 0, sorted: false, heapified: false, extracting: false },
      { value: 34, index: 1, sorted: false, heapified: false, extracting: false },
      { value: 25, index: 2, sorted: false, heapified: false, extracting: false },
      { value: 12, index: 3, sorted: false, heapified: false, extracting: false },
      { value: 22, index: 4, sorted: false, heapified: false, extracting: false },
      { value: 11, index: 5, sorted: false, heapified: false, extracting: false },
      { value: 90, index: 6, sorted: false, heapified: false, extracting: false },
      { value: 88, index: 7, sorted: false, heapified: false, extracting: false }
    ]);
    setCurrentIndex(0);
    setOperation('');
    onReset();
  };

  const handleStep = () => {
    if (currentIndex === 0) {
      buildMaxHeap();
      setCurrentIndex(1);
    } else if (currentIndex <= array.length) {
      extractMax();
      setCurrentIndex(prev => prev + 1);
    } else {
      completeSort();
      setCurrentIndex(0);
    }
  };

  const buildMaxHeap = () => {
    setOperation('building_heap');
    setArray(prev => prev.map(el => ({
      ...el,
      heapified: true
    })));
  };

  const extractMax = () => {
    setOperation('extracting_max');
    
    // Highlight the root (max element)
    setArray(prev => prev.map((el, i) => ({
      ...el,
      extracting: i === 0
    })));
    
    // Move max to end and mark as sorted
    setTimeout(() => {
      setArray(prev => {
        const newArray = [...prev];
        const maxValue = newArray[0].value;
        
        // Move elements down
        for (let i = 0; i < newArray.length - currentIndex; i++) {
          newArray[i] = newArray[i + 1];
        }
        
        // Place max at the end
        newArray[newArray.length - currentIndex] = {
          ...newArray[newArray.length - currentIndex],
          value: maxValue,
          sorted: true,
          extracting: false
        };
        
        return newArray;
      });
    }, 500);
  };

  const completeSort = () => {
    setArray(prev => prev.map(el => ({
      ...el,
      sorted: true,
      heapified: false,
      extracting: false
    })));
    setOperation('complete');
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Heap Sort Visualization</h3>
        
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
            <label className="text-sm font-medium">Current Step</label>
            <div className="px-4 py-2 bg-gray-100 rounded-md text-sm">
              {currentIndex === 0 ? 'Build Heap' : currentIndex <= array.length ? 'Extract Max' : 'Complete'}
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
                      : element.extracting
                      ? 'bg-red-500'
                      : element.heapified
                      ? 'bg-blue-500'
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
              <li className={currentIndex >= 0 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                Build max heap
              </li>
              <li className={currentIndex >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                Extract maximum repeatedly
              </li>
              <li className={currentIndex > array.length ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                Place in sorted portion
              </li>
            </ol>
          </div>
          
          {/* Complexity Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Time Complexity</div>
              <div className="font-mono">O(n log n)</div>
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

export default HeapSortVisualization; 