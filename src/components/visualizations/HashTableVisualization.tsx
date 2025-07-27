import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HashTableVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface HashEntry {
  key: string;
  value: number;
  index: number;
}

const HashTableVisualization: React.FC<HashTableVisualizationProps> = ({ isPlaying, onReset }) => {
  const [hashTable, setHashTable] = useState<HashEntry[]>([]);
  const [operation, setOperation] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [insertKey, setInsertKey] = useState<string>('');
  const [insertValue, setInsertValue] = useState<string>('');

  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash + key.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash) % 10; // Use modulo 10 for visualization
  };

  const operations = [
    { type: 'insert', key: 'apple', value: 5, delay: 1000 },
    { type: 'insert', key: 'banana', value: 8, delay: 2000 },
    { type: 'insert', key: 'cherry', value: 3, delay: 3000 },
    { type: 'search', key: 'banana', delay: 4000 },
    { type: 'delete', key: 'apple', delay: 5000 },
    { type: 'insert', key: 'date', value: 12, delay: 6000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < operations.length) {
          const op = operations[currentIndex];
          setOperation(op.type);
          
          if (op.type === 'insert' && op.value !== undefined) {
            const index = hashFunction(op.key);
            setHighlightedIndex(index);
            setTimeout(() => {
              setHashTable(prev => [...prev, { key: op.key, value: op.value, index }]);
              setHighlightedIndex(null);
            }, 500);
          } else if (op.type === 'search') {
            const index = hashFunction(op.key);
            setHighlightedIndex(index);
            setTimeout(() => {
              setHighlightedIndex(null);
            }, 1000);
          } else if (op.type === 'delete') {
            const index = hashFunction(op.key);
            setHighlightedIndex(index);
            setTimeout(() => {
              setHashTable(prev => prev.filter(entry => entry.key !== op.key));
              setHighlightedIndex(null);
            }, 500);
          }
          
          currentIndex++;
        } else {
          // setIsPlaying(false); // This line was commented out in the original file, so I'm keeping it commented.
        }
      }, operations[currentIndex]?.delay || 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleInsert = () => {
    if (insertKey && insertValue) {
      const index = hashFunction(insertKey);
      setHashTable(prev => [...prev, { key: insertKey, value: parseInt(insertValue), index }]);
      setInsertKey('');
      setInsertValue('');
    }
  };

  const handleSearch = () => {
    if (searchKey) {
      const index = hashFunction(searchKey);
      setHighlightedIndex(index);
      setTimeout(() => setHighlightedIndex(null), 1000);
      setSearchKey('');
    }
  };

  const handleDelete = (key: string) => {
    setHashTable(prev => prev.filter(entry => entry.key !== key));
  };

  const resetVisualization = () => {
    setHashTable([]);
    setOperation('');
    setHighlightedIndex(null);
    setSearchKey('');
    setInsertKey('');
    setInsertValue('');
    onReset();
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Hash Table Operations</h3>
        
        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Insert</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Key"
                value={insertKey}
                onChange={(e) => setInsertKey(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="number"
                placeholder="Value"
                value={insertValue}
                onChange={(e) => setInsertValue(e.target.value)}
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
            <label className="text-sm font-medium">Search</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Key"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-secondary-600 text-white rounded-md text-sm hover:bg-secondary-700"
              >
                Search
              </button>
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

        {/* Hash Table Visualization */}
        <div className="space-y-4">
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={i}
                className={`h-16 border-2 rounded-lg flex items-center justify-center text-sm font-mono ${
                  highlightedIndex === i
                    ? 'border-primary-500 bg-primary-100'
                    : 'border-gray-300 bg-gray-50'
                }`}
                animate={highlightedIndex === i ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-xs text-gray-500">[{i}]</div>
                  {hashTable
                    .filter(entry => entry.index === i)
                    .map((entry, idx) => (
                      <motion.div
                        key={entry.key}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs bg-blue-100 px-1 py-0.5 rounded mt-1"
                      >
                        {entry.key}: {entry.value}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
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
        </div>
      </div>
    </div>
  );
};

export default HashTableVisualization; 