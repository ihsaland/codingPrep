import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SetVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface SetElement {
  value: number;
  highlighted: boolean;
  operation: string;
}

const SetVisualization: React.FC<SetVisualizationProps> = ({ isPlaying, onReset }) => {
  const [setElements, setSetElements] = useState<SetElement[]>([]);
  const [operation, setOperation] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const operations = [
    { type: 'add', value: 5, delay: 1000 },
    { type: 'add', value: 10, delay: 2000 },
    { type: 'add', value: 15, delay: 3000 },
    { type: 'contains', value: 10, delay: 4000 },
    { type: 'remove', value: 5, delay: 5000 },
    { type: 'add', value: 20, delay: 6000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < operations.length) {
          const op = operations[currentIndex];
          setOperation(op.type);
          
          if (op.type === 'add' && op.value !== undefined) {
            addElement(op.value);
          } else if (op.type === 'remove' && op.value !== undefined) {
            removeElement(op.value);
          } else if (op.type === 'contains' && op.value !== undefined) {
            containsElement(op.value);
          }
          
          currentIndex++;
        } else {
          // setIsPlaying(false);
        }
      }, operations[currentIndex]?.delay || 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const addElement = (value: number) => {
    setSetElements(prev => {
      if (prev.find(el => el.value === value)) {
        // Element already exists
        return prev.map(el => 
          el.value === value 
            ? { ...el, highlighted: true, operation: 'duplicate' }
            : el
        );
      }
      return [...prev, { value, highlighted: true, operation: 'add' }];
    });
  };

  const removeElement = (value: number) => {
    setSetElements(prev => {
      const element = prev.find(el => el.value === value);
      if (element) {
        // Highlight before removing
        const highlighted = prev.map(el => 
          el.value === value 
            ? { ...el, highlighted: true, operation: 'remove' }
            : el
        );
        
        setTimeout(() => {
          setSetElements(current => current.filter(el => el.value !== value));
        }, 500);
        
        return highlighted;
      }
      return prev;
    });
  };

  const containsElement = (value: number) => {
    setSetElements(prev => {
      const element = prev.find(el => el.value === value);
      if (element) {
        return prev.map(el => 
          el.value === value 
            ? { ...el, highlighted: true, operation: 'found' }
            : el
        );
      }
      return prev;
    });
  };

  const handleAdd = () => {
    if (newValue) {
      addElement(parseInt(newValue));
      setNewValue('');
    }
  };

  const handleRemove = () => {
    if (searchValue) {
      removeElement(parseInt(searchValue));
      setSearchValue('');
    }
  };

  const handleContains = () => {
    if (searchValue) {
      containsElement(parseInt(searchValue));
      setSearchValue('');
    }
  };

  const resetVisualization = () => {
    setSetElements([]);
    setOperation('');
    setNewValue('');
    setSearchValue('');
    onReset();
  };

  const getSetSize = () => setElements.length;
  const getUniqueElements = () => new Set(setElements.map(el => el.value)).size;

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Set Operations</h3>
        
        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Add Element</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Remove Element</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleRemove}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Contains Element</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleContains}
                className="px-4 py-2 bg-secondary-600 text-white rounded-md text-sm hover:bg-secondary-700"
              >
                Contains
              </button>
            </div>
          </div>
        </div>

        {/* Set Visualization */}
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-md font-medium mb-2">Set Elements</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {setElements.length === 0 ? (
                <div className="text-gray-500 text-sm">Empty Set</div>
              ) : (
                setElements.map((element, index) => (
                  <motion.div
                    key={`${element.value}-${index}`}
                    className={`px-3 py-2 rounded-lg text-white font-bold text-sm ${
                      element.highlighted
                        ? element.operation === 'add'
                          ? 'bg-green-500'
                          : element.operation === 'remove'
                          ? 'bg-red-500'
                          : element.operation === 'found'
                          ? 'bg-blue-500'
                          : element.operation === 'duplicate'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                        : 'bg-blue-500'
                    }`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {element.value}
                  </motion.div>
                ))
              )}
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
          
          {/* Set Properties */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Size</div>
              <div>{getSetSize()}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Unique Elements</div>
              <div>{getUniqueElements()}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">Is Empty</div>
              <div>{setElements.length === 0 ? 'Yes' : 'No'}</div>
            </div>
          </div>
          
          {/* Reset Button */}
          <div className="mt-4">
            <button
              onClick={resetVisualization}
              className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetVisualization; 