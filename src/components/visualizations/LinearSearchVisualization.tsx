import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LinearSearchVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface ArrayElement {
  value: number;
  index: number;
  checked: boolean;
  found: boolean;
  current: boolean;
}

const LinearSearchVisualization: React.FC<LinearSearchVisualizationProps> = ({ isPlaying, onReset }) => {
  const [array, setArray] = useState<ArrayElement[]>([
    { value: 64, index: 0, checked: false, found: false, current: false },
    { value: 34, index: 1, checked: false, found: false, current: false },
    { value: 25, index: 2, checked: false, found: false, current: false },
    { value: 12, index: 3, checked: false, found: false, current: false },
    { value: 22, index: 4, checked: false, found: false, current: false },
    { value: 11, index: 5, checked: false, found: false, current: false },
    { value: 90, index: 6, checked: false, found: false, current: false },
    { value: 88, index: 7, checked: false, found: false, current: false }
  ]);
  const [target, setTarget] = useState<number>(22);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [foundIndex, setFoundIndex] = useState<number>(-1);
  const [operation, setOperation] = useState<string>('');

  const operations = [
    { type: 'search', target: 22, delay: 1000 },
    { type: 'found', index: 4, delay: 2000 },
    { type: 'reset', delay: 3000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < operations.length) {
          const op = operations[currentStep];
          setOperation(op.type);
          
          if (op.type === 'search' && op.target !== undefined) {
            performLinearSearch(op.target);
          } else if (op.type === 'found' && op.index !== undefined) {
            highlightFound(op.index);
          } else if (op.type === 'reset') {
            resetSearch();
          }
          
          currentStep++;
        } else {
          // setIsPlaying(false);
        }
      }, operations[currentStep]?.delay || 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const performLinearSearch = (searchTarget: number) => {
    setTarget(searchTarget);
    setFoundIndex(-1);
    setCurrentIndex(0);
    
    const searchStep = (index: number) => {
      if (index >= array.length) {
        // Target not found
        setOperation('not_found');
        return;
      }
      
      setCurrentIndex(index);
      setArray(prev => prev.map((el, i) => ({
        ...el,
        current: i === index,
        checked: i <= index
      })));
      
      if (array[index].value === searchTarget) {
        setFoundIndex(index);
        setOperation('found');
        setTimeout(() => {
          setArray(prev => prev.map((el, i) => ({
            ...el,
            found: i === index,
            current: false
          })));
        }, 500);
      } else {
        setTimeout(() => searchStep(index + 1), 800);
      }
    };
    
    searchStep(0);
  };

  const highlightFound = (index: number) => {
    setArray(prev => prev.map((el, i) => ({
      ...el,
      found: i === index,
      current: false
    })));
  };

  const resetSearch = () => {
    setArray(prev => prev.map(el => ({
      ...el,
      checked: false,
      found: false,
      current: false
    })));
    setCurrentIndex(0);
    setFoundIndex(-1);
    setOperation('');
  };

  const handleSearch = () => {
    if (target !== null) {
      performLinearSearch(target);
    }
  };

  const handleReset = () => {
    resetSearch();
    onReset();
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Linear Search Visualization</h3>
        
        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Target</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Target"
                value={target}
                onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
              >
                Search
              </button>
            </div>
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
              onClick={handleReset}
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
                    element.found
                      ? 'bg-green-500'
                      : element.current
                      ? 'bg-blue-500'
                      : element.checked
                      ? 'bg-gray-400'
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
                {foundIndex !== -1 && ` - Found at index ${foundIndex}`}
              </span>
            </motion.div>
          )}
          
          {/* Algorithm Steps */}
          <div className="space-y-2">
            <h4 className="text-md font-medium">Algorithm Steps</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li className="text-blue-600 font-medium">
                Start from first element
              </li>
              <li className="text-blue-600 font-medium">
                Compare with target
              </li>
              <li className="text-blue-600 font-medium">
                Move to next element if not found
              </li>
            </ol>
          </div>
          
          {/* Complexity Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Time Complexity</div>
              <div className="font-mono">O(n)</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Space Complexity</div>
              <div className="font-mono">O(1)</div>
            </div>
          </div>
          
          {/* Search Results */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-medium">Search Results</div>
            <div className="text-sm">
              {foundIndex !== -1 ? (
                <span className="text-green-600">Found {target} at index {foundIndex}</span>
              ) : operation === 'not_found' ? (
                <span className="text-red-600">Target {target} not found</span>
              ) : (
                <span className="text-gray-500">No search performed yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinearSearchVisualization; 