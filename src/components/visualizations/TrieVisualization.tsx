import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TrieVisualizationProps {
  isPlaying: boolean;
  onReset: () => void;
}

interface TrieNode {
  char: string;
  isEnd: boolean;
  children: Map<string, TrieNode>;
  highlighted: boolean;
  x: number;
  y: number;
}

const TrieVisualization: React.FC<TrieVisualizationProps> = ({ isPlaying, onReset }) => {
  const [root, setRoot] = useState<TrieNode>({
    char: '',
    isEnd: false,
    children: new Map(),
    highlighted: false,
    x: 400,
    y: 50
  });
  const [operation, setOperation] = useState<string>('');
  const [newWord, setNewWord] = useState<string>('');
  const [searchWord, setSearchWord] = useState<string>('');
  const [prefix, setPrefix] = useState<string>('');

  const operations = [
    { type: 'insert', word: 'cat', delay: 1000 },
    { type: 'insert', word: 'car', delay: 2000 },
    { type: 'insert', word: 'dog', delay: 3000 },
    { type: 'search', word: 'cat', delay: 4000 },
    { type: 'prefix', word: 'ca', delay: 5000 },
    { type: 'insert', word: 'card', delay: 6000 }
  ];

  useEffect(() => {
    if (isPlaying) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < operations.length) {
          const op = operations[currentIndex];
          setOperation(op.type);
          
          if (op.type === 'insert' && op.word) {
            insertWord(op.word);
          } else if (op.type === 'search' && op.word) {
            searchWordInTrie(op.word);
          } else if (op.type === 'prefix' && op.word) {
            findPrefix(op.word);
          }
          
          currentIndex++;
        } else {
          // setIsPlaying(false);
        }
      }, operations[currentIndex]?.delay || 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const insertWord = (word: string) => {
    setRoot(prevRoot => {
      const newRoot = { ...prevRoot };
      let current = newRoot;
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!current.children.has(char)) {
          current.children.set(char, {
            char,
            isEnd: i === word.length - 1,
            children: new Map(),
            highlighted: true,
            x: current.x + (i * 80),
            y: current.y + 80
          });
        } else {
          const existingNode = current.children.get(char)!;
          existingNode.isEnd = existingNode.isEnd || i === word.length - 1;
          existingNode.highlighted = true;
        }
        current = current.children.get(char)!;
      }
      
      return newRoot;
    });
  };

  const searchWordInTrie = (word: string) => {
    setRoot(prevRoot => {
      const newRoot = { ...prevRoot };
      let current = newRoot;
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!current.children.has(char)) {
          return newRoot; // Word not found
        }
        current = current.children.get(char)!;
        current.highlighted = true;
      }
      
      return newRoot;
    });
  };

  const findPrefix = (prefix: string) => {
    setRoot(prevRoot => {
      const newRoot = { ...prevRoot };
      let current = newRoot;
      
      for (let i = 0; i < prefix.length; i++) {
        const char = prefix[i];
        if (!current.children.has(char)) {
          return newRoot; // Prefix not found
        }
        current = current.children.get(char)!;
        current.highlighted = true;
      }
      
      return newRoot;
    });
  };

  const handleInsert = () => {
    if (newWord) {
      insertWord(newWord);
      setNewWord('');
    }
  };

  const handleSearch = () => {
    if (searchWord) {
      searchWordInTrie(searchWord);
      setSearchWord('');
    }
  };

  const handlePrefix = () => {
    if (prefix) {
      findPrefix(prefix);
      setPrefix('');
    }
  };

  const resetVisualization = () => {
    setRoot({
      char: '',
      isEnd: false,
      children: new Map(),
      highlighted: false,
      x: 400,
      y: 50
    });
    setOperation('');
    setNewWord('');
    setSearchWord('');
    setPrefix('');
    onReset();
  };

  const renderNode = (node: TrieNode, level: number = 0): JSX.Element => {
    const children = Array.from(node.children.values());
    
    return (
      <div key={node.char || 'root'} className="relative">
        <motion.div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
            node.highlighted ? 'bg-green-500' : 'bg-blue-500'
          } ${node.isEnd ? 'ring-2 ring-yellow-400' : ''}`}
          style={{ position: 'absolute', left: node.x, top: node.y }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {node.char || 'ROOT'}
        </motion.div>
        
        {children.map((child, index) => (
          <div key={child.char}>
            {/* Connection line */}
            <svg
              style={{
                position: 'absolute',
                left: Math.min(node.x, child.x),
                top: Math.min(node.y, child.y),
                width: Math.abs(child.x - node.x),
                height: Math.abs(child.y - node.y)
              }}
            >
              <line
                x1={node.x - Math.min(node.x, child.x)}
                y1={node.y - Math.min(node.y, child.y)}
                x2={child.x - Math.min(node.x, child.x)}
                y2={child.y - Math.min(node.y, child.y)}
                stroke="#6B7280"
                strokeWidth="2"
              />
            </svg>
            {renderNode(child, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Trie Operations</h3>
        
        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Insert Word</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Word"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
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
            <label className="text-sm font-medium">Search Word</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Word"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
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
            <label className="text-sm font-medium">Find Prefix</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handlePrefix}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              >
                Find
              </button>
            </div>
          </div>
        </div>

        {/* Trie Visualization */}
        <div className="relative h-96 border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
          {renderNode(root)}
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
  );
};

export default TrieVisualization; 