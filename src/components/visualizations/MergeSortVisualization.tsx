import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MergeSortVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface ArrayElement {
  value: number;
  index: number;
  sorted: boolean;
  comparing: boolean;
  merging: boolean;
}

const MergeSortVisualization: React.FC<MergeSortVisualizationProps> = ({ isPlaying, onReset }) => {
  const [array, setArray] = useState<ArrayElement[]>([
    { value: 64, index: 0, sorted: false, comparing: false, merging: false },
    { value: 34, index: 1, sorted: false, comparing: false, merging: false },
    { value: 25, index: 2, sorted: false, comparing: false, merging: false },
    { value: 12, index: 3, sorted: false, comparing: false, merging: false },
    { value: 22, index: 4, sorted: false, comparing: false, merging: false },
    { value: 11, index: 5, sorted: false, comparing: false, merging: false },
    { value: 90, index: 6, sorted: false, comparing: false, merging: false },
    { value: 88, index: 7, sorted: false, comparing: false, merging: false }
  ]);
  const [operation, setOperation] = useState<string>('');
  const [step, setStep] = useState<number>(0);

  const operations = [
    { type: 'divide', delay: 1000 },
    { type: 'merge', delay: 2000 },
    { type: 'complete', delay: 3000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < operations.length) {
          const op = operations[currentStep];
          setOperation(op.type);
          setStep(currentStep);
          
          if (op.type === 'divide') {
            performDivideStep();
          } else if (op.type === 'merge') {
            performMergeStep();
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

  const performDivideStep = () => {
    setArray(prev => prev.map((el, index) => ({
      ...el,
      comparing: index < prev.length / 2,
      merging: false
    })));
  };

  const performMergeStep = () => {
    setArray(prev => prev.map((el, index) => ({
      ...el,
      comparing: false,
      merging: true
    })));
  };

  const completeSort = () => {
    setArray(prev => prev.map((el, index) => ({
      ...el,
      sorted: true,
      comparing: false,
      merging: false
    })));
  };

  const resetVisualization = () => {
    setArray([
      { value: 64, index: 0, sorted: false, comparing: false, merging: false },
      { value: 34, index: 1, sorted: false, comparing: false, merging: false },
      { value: 25, index: 2, sorted: false, comparing: false, merging: false },
      { value: 12, index: 3, sorted: false, comparing: false, merging: false },
      { value: 22, index: 4, sorted: false, comparing: false, merging: false },
      { value: 11, index: 5, sorted: false, comparing: false, merging: false },
      { value: 90, index: 6, sorted: false, comparing: false, merging: false },
      { value: 88, index: 7, sorted: false, comparing: false, merging: false }
    ]);
    setOperation('');
    setStep(0);
    onReset();
  };

  const handleStep = () => {
    if (step === 0) {
      performDivideStep();
      setStep(1);
    } else if (step === 1) {
      performMergeStep();
      setStep(2);
    } else if (step === 2) {
      completeSort();
      setStep(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Merge Sort Visualization</h3>
        
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
              {step === 0 ? 'Divide' : step === 1 ? 'Merge' : 'Complete'}
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
                      : element.comparing
                      ? 'bg-blue-500'
                      : element.merging
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
              <li className={step >= 0 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                Divide array into halves
              </li>
              <li className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                Recursively sort halves
              </li>
              <li className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                Merge sorted halves
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
              <div className="font-mono">O(n)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeSortVisualization; 