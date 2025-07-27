import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeapVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface HeapNode {
  value: number;
  index: number;
  highlighted: boolean;
}

const HeapVisualization: React.FC<HeapVisualizationProps> = ({ isPlaying, onReset }) => {
  const [heap, setHeap] = useState<HeapNode[]>([]);
  const [operation, setOperation] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');

  const operations = [
    { type: 'insert', value: 10, delay: 1000 },
    { type: 'insert', value: 20, delay: 2000 },
    { type: 'insert', value: 15, delay: 3000 },
    { type: 'insert', value: 30, delay: 4000 },
    { type: 'extract_max', delay: 5000 },
    { type: 'insert', value: 25, delay: 6000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < operations.length) {
          const op = operations[currentIndex];
          setOperation(op.type);
          
          if (op.type === 'insert' && op.value !== undefined) {
            insertValue(op.value);
          } else if (op.type === 'extract_max') {
            extractMax();
          }
          
          currentIndex++;
        } else {
          // setIsPlaying(false);
        }
      }, operations[currentIndex]?.delay || 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const getParentIndex = (index: number): number => Math.floor((index - 1) / 2);
  const getLeftChildIndex = (index: number): number => 2 * index + 1;
  const getRightChildIndex = (index: number): number => 2 * index + 2;

  const swap = (arr: HeapNode[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const heapifyUp = (heapArray: HeapNode[], index: number) => {
    while (index > 0) {
      const parentIndex = getParentIndex(index);
      if (heapArray[parentIndex].value < heapArray[index].value) {
        swap(heapArray, parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  };

  const heapifyDown = (heapArray: HeapNode[], index: number) => {
    while (index < heapArray.length) {
      let largest = index;
      const leftChild = getLeftChildIndex(index);
      const rightChild = getRightChildIndex(index);

      if (leftChild < heapArray.length && heapArray[leftChild].value > heapArray[largest].value) {
        largest = leftChild;
      }

      if (rightChild < heapArray.length && heapArray[rightChild].value > heapArray[largest].value) {
        largest = rightChild;
      }

      if (largest !== index) {
        swap(heapArray, index, largest);
        index = largest;
      } else {
        break;
      }
    }
  };

  const insertValue = (value: number) => {
    setHeap(prev => {
      const newHeap = [...prev];
      const newNode: HeapNode = {
        value,
        index: newHeap.length,
        highlighted: true
      };
      newHeap.push(newNode);
      heapifyUp(newHeap, newHeap.length - 1);
      
      // Update indices
      newHeap.forEach((node, index) => {
        node.index = index;
        node.highlighted = false;
      });
      
      return newHeap;
    });
  };

  const extractMax = () => {
    if (heap.length === 0) return;

    setHeap(prev => {
      const newHeap = [...prev];
      if (newHeap.length === 1) {
        return [];
      }

      // Highlight the root (max element)
      newHeap[0].highlighted = true;

      // Move last element to root
      newHeap[0] = newHeap[newHeap.length - 1];
      newHeap[0].index = 0;
      newHeap.pop();

      // Heapify down
      heapifyDown(newHeap, 0);

      // Update indices and remove highlighting
      newHeap.forEach((node, index) => {
        node.index = index;
        node.highlighted = false;
      });

      return newHeap;
    });
  };

  const handleInsert = () => {
    if (newValue) {
      insertValue(parseInt(newValue));
      setNewValue('');
    }
  };

  const resetVisualization = () => {
    setHeap([]);
    setOperation('');
    setNewValue('');
    onReset();
  };

  const renderHeapLevel = (level: number) => {
    const startIndex = Math.pow(2, level) - 1;
    const endIndex = Math.min(Math.pow(2, level + 1) - 1, heap.length);
    const nodesInLevel = heap.slice(startIndex, endIndex);

    return (
      <div key={level} className="flex justify-center space-x-4">
        {nodesInLevel.map((node, index) => (
          <motion.div
            key={node.index}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              node.highlighted ? 'bg-green-500' : 'bg-blue-500'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {node.value}
          </motion.div>
        ))}
      </div>
    );
  };

  const getHeapLevels = () => {
    const levels = [];
    let currentLevel = 0;
    let currentIndex = 0;

    while (currentIndex < heap.length) {
      const nodesInLevel = heap.slice(currentIndex, currentIndex + Math.pow(2, currentLevel));
      levels.push(nodesInLevel);
      currentIndex += Math.pow(2, currentLevel);
      currentLevel++;
    }

    return levels;
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Max Heap Operations</h3>
        
        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Insert Value</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleInsert}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
              >
                Insert
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Extract Max</label>
            <button
              onClick={extractMax}
              disabled={heap.length === 0}
              className="w-full px-4 py-2 bg-secondary-600 text-white rounded-md text-sm hover:bg-secondary-700 disabled:bg-gray-400"
            >
              Extract Max
            </button>
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

        {/* Heap Visualization */}
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-md font-medium mb-2">Heap Structure</h4>
            <div className="space-y-4">
              {getHeapLevels().map((level, index) => (
                <div key={index} className="flex justify-center space-x-4">
                  {level.map((node) => (
                    <motion.div
                      key={node.index}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        node.highlighted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {node.value}
                    </motion.div>
                  ))}
                </div>
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
          
          {/* Heap Properties */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Size</div>
              <div>{heap.length}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Max Value</div>
              <div>{heap.length > 0 ? Math.max(...heap.map(n => n.value)) : 'N/A'}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Height</div>
              <div>{heap.length > 0 ? Math.floor(Math.log2(heap.length)) + 1 : 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeapVisualization; 