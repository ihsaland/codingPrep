import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import ArrayVisualization from '../components/visualizations/ArrayVisualization';
import LinkedListVisualization from '../components/visualizations/LinkedListVisualization';
import StackVisualization from '../components/visualizations/StackVisualization';
import QueueVisualization from '../components/visualizations/QueueVisualization';
import TreeVisualization from '../components/visualizations/TreeVisualization';
import HashTableVisualization from '../components/visualizations/HashTableVisualization';
import GraphVisualization from '../components/visualizations/GraphVisualization';
import HeapVisualization from '../components/visualizations/HeapVisualization';
import TrieVisualization from '../components/visualizations/TrieVisualization';
import SetVisualization from '../components/visualizations/SetVisualization';

const DataStructures: React.FC = () => {
  const [selectedStructure, setSelectedStructure] = useState('array');
  const [isPlaying, setIsPlaying] = useState(false);

  const dataStructures = [
    {
      id: 'array',
      name: 'Array/List',
      description: 'A collection of elements stored at contiguous memory locations.',
      complexity: {
        access: 'O(1)',
        search: 'O(n)',
        insertion: 'O(n)',
        deletion: 'O(n)'
      },
      useCases: ['Random access', 'Sequential access', 'Simple data storage'],
      visualization: ArrayVisualization
    },
    {
      id: 'linkedlist',
      name: 'Linked List',
      description: 'A linear data structure where elements are stored in nodes, and each node points to the next node.',
      complexity: {
        access: 'O(n)',
        search: 'O(n)',
        insertion: 'O(1)',
        deletion: 'O(1)'
      },
      useCases: ['Dynamic memory allocation', 'Implementation of stacks and queues', 'Memory efficient'],
      visualization: LinkedListVisualization
    },
    {
      id: 'stack',
      name: 'Stack',
      description: 'A linear data structure that follows LIFO (Last In First Out) principle.',
      complexity: {
        access: 'O(n)',
        search: 'O(n)',
        insertion: 'O(1)',
        deletion: 'O(1)'
      },
      useCases: ['Function call stack', 'Undo operations', 'Expression evaluation'],
      visualization: StackVisualization
    },
    {
      id: 'queue',
      name: 'Queue',
      description: 'A linear data structure that follows FIFO (First In First Out) principle.',
      complexity: {
        access: 'O(n)',
        search: 'O(n)',
        insertion: 'O(1)',
        deletion: 'O(1)'
      },
      useCases: ['Breadth-first search', 'Print spooling', 'CPU scheduling'],
      visualization: QueueVisualization
    },
    {
      id: 'tree',
      name: 'Binary Tree',
      description: 'A hierarchical data structure where each node has at most two children.',
      complexity: {
        access: 'O(log n)',
        search: 'O(log n)',
        insertion: 'O(log n)',
        deletion: 'O(log n)'
      },
      useCases: ['Binary search trees', 'Expression trees', 'File system organization'],
      visualization: TreeVisualization
    },
    {
      id: 'hashtable',
      name: 'Hash Table',
      description: 'A data structure that implements an associative array abstract data type, a structure that can map keys to values.',
      complexity: {
        access: 'O(1)',
        search: 'O(1)',
        insertion: 'O(1)',
        deletion: 'O(1)'
      },
      useCases: ['Database indexing', 'Caching', 'Symbol tables'],
      visualization: HashTableVisualization
    },
    {
      id: 'graph',
      name: 'Graph',
      description: 'A non-linear data structure consisting of nodes and edges that connect these nodes.',
      complexity: {
        access: 'O(V + E)',
        search: 'O(V + E)',
        insertion: 'O(1)',
        deletion: 'O(1)'
      },
      useCases: ['Social networks', 'GPS navigation', 'Network routing'],
      visualization: GraphVisualization
    },
    {
      id: 'heap',
      name: 'Heap',
      description: 'A specialized tree-based data structure that satisfies the heap property.',
      complexity: {
        access: 'O(1)',
        search: 'O(n)',
        insertion: 'O(log n)',
        deletion: 'O(log n)'
      },
      useCases: ['Priority queues', 'Heap sort', 'Graph algorithms'],
      visualization: HeapVisualization
    },
    {
      id: 'trie',
      name: 'Trie',
      description: 'A tree-like data structure used to store a dynamic set of strings.',
      complexity: {
        access: 'O(m)',
        search: 'O(m)',
        insertion: 'O(m)',
        deletion: 'O(m)'
      },
      useCases: ['Autocomplete', 'Spell checkers', 'IP routing'],
      visualization: TrieVisualization
    },
    {
      id: 'set',
      name: 'Set',
      description: 'A collection of unique elements with no specific order.',
      complexity: {
        access: 'O(1)',
        search: 'O(1)',
        insertion: 'O(1)',
        deletion: 'O(1)'
      },
      useCases: ['Duplicate removal', 'Membership testing', 'Mathematical operations'],
      visualization: SetVisualization
    }
  ];

  const currentStructure = dataStructures.find(ds => ds.id === selectedStructure);
  const VisualizationComponent = currentStructure?.visualization;

  const getPythonExample = (structureName: string) => {
    switch (structureName.toLowerCase()) {
      case 'array':
      case 'list':
        return `# Python List implementation
class List:
    def __init__(self):
        self.data = []
    
    def append(self, value):
        """Add element to end of list"""
        self.data.append(value)
    
    def insert(self, index, value):
        """Insert element at specific index"""
        self.data.insert(index, value)
    
    def remove(self, value):
        """Remove first occurrence of value"""
        self.data.remove(value)
    
    def get(self, index):
        """Get element at index"""
        return self.data[index]`;
      
      case 'linked list':
        return `# Python Linked List implementation
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, value):
        """Add element to end of list"""
        if not self.head:
            self.head = Node(value)
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = Node(value)
    
    def delete(self, value):
        """Delete first occurrence of value"""
        if not self.head:
            return
        
        if self.head.value == value:
            self.head = self.head.next
            return
        
        current = self.head
        while current.next:
            if current.next.value == value:
                current.next = current.next.next
                return
            current = current.next`;
      
      case 'stack':
        return `# Python Stack implementation
class Stack:
    def __init__(self):
        self.data = []
    
    def push(self, value):
        """Add element to top of stack"""
        self.data.append(value)
    
    def pop(self):
        """Remove and return top element"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.data.pop()
    
    def peek(self):
        """Return top element without removing"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.data[-1]
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.data) == 0`;
      
      case 'queue':
        return `# Python Queue implementation
from collections import deque

class Queue:
    def __init__(self):
        self.data = deque()
    
    def enqueue(self, value):
        """Add element to end of queue"""
        self.data.append(value)
    
    def dequeue(self):
        """Remove and return front element"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.data.popleft()
    
    def peek(self):
        """Return front element without removing"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.data[0]
    
    def is_empty(self):
        """Check if queue is empty"""
        return len(self.data) == 0`;
      
      case 'binary tree':
        return `# Python Binary Tree implementation
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        """Insert value into tree"""
        if not self.root:
            self.root = TreeNode(value)
            return
        
        self._insert_recursive(self.root, value)
    
    def _insert_recursive(self, node, value):
        """Helper method for recursive insertion"""
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)
    
    def search(self, value):
        """Search for value in tree"""
        return self._search_recursive(self.root, value)
    
    def _search_recursive(self, node, value):
        """Helper method for recursive search"""
        if node is None or node.value == value:
            return node
        if value < node.value:
            return self._search_recursive(node.left, value)
        return self._search_recursive(node.right, value)`;
      
      case 'hash table':
        return `# Python Hash Table implementation
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        """Generate hash for key"""
        return hash(key) % self.size
    
    def put(self, key, value):
        """Insert key-value pair"""
        hash_key = self._hash(key)
        bucket = self.table[hash_key]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        bucket.append((key, value))
    
    def get(self, key):
        """Get value for key"""
        hash_key = self._hash(key)
        bucket = self.table[hash_key]
        
        for k, v in bucket:
            if k == key:
                return v
        
        raise KeyError(f"Key {key} not found")
    
    def delete(self, key):
        """Delete key-value pair"""
        hash_key = self._hash(key)
        bucket = self.table[hash_key]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return
        
        raise KeyError(f"Key {key} not found")`;
      
      case 'graph':
        return `# Python Graph implementation
from collections import defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        """Add edge from u to v"""
        self.graph[u].append(v)
    
    def add_vertex(self, vertex):
        """Add vertex to graph"""
        if vertex not in self.graph:
            self.graph[vertex] = []
    
    def get_neighbors(self, vertex):
        """Get all neighbors of vertex"""
        return self.graph[vertex]
    
    def dfs(self, start, visited=None):
        """Depth-first search"""
        if visited is None:
            visited = set()
        
        visited.add(start)
        print(start, end=' ')
        
        for neighbor in self.graph[start]:
            if neighbor not in visited:
                self.dfs(neighbor, visited)
    
    def bfs(self, start):
        """Breadth-first search"""
        visited = set()
        queue = [start]
        visited.add(start)
        
        while queue:
            vertex = queue.pop(0)
            print(vertex, end=' ')
            
            for neighbor in self.graph[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)`;
      
      case 'heap':
        return `# Python Heap implementation
import heapq

class MinHeap:
    def __init__(self):
        self.heap = []
    
    def push(self, value):
        """Add element to heap"""
        heapq.heappush(self.heap, value)
    
    def pop(self):
        """Remove and return smallest element"""
        if self.is_empty():
            raise IndexError("Heap is empty")
        return heapq.heappop(self.heap)
    
    def peek(self):
        """Return smallest element without removing"""
        if self.is_empty():
            raise IndexError("Heap is empty")
        return self.heap[0]
    
    def is_empty(self):
        """Check if heap is empty"""
        return len(self.heap) == 0

# Max Heap using negative values
class MaxHeap:
    def __init__(self):
        self.heap = []
    
    def push(self, value):
        """Add element to heap"""
        heapq.heappush(self.heap, -value)
    
    def pop(self):
        """Remove and return largest element"""
        if self.is_empty():
            raise IndexError("Heap is empty")
        return -heapq.heappop(self.heap)
    
    def peek(self):
        """Return largest element without removing"""
        if self.is_empty():
            raise IndexError("Heap is empty")
        return -self.heap[0]`;
      
      case 'trie':
        return `# Python Trie implementation
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        """Insert word into trie"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        """Search for word in trie"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        """Check if any word starts with prefix"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
    
    def get_all_words(self, prefix=""):
        """Get all words with given prefix"""
        words = []
        node = self.root
        
        # Navigate to prefix node
        for char in prefix:
            if char not in node.children:
                return words
            node = node.children[char]
        
        self._collect_words(node, prefix, words)
        return words
    
    def _collect_words(self, node, current_word, words):
        """Helper method to collect all words"""
        if node.is_end_of_word:
            words.append(current_word)
        
        for char, child in node.children.items():
            self._collect_words(child, current_word + char, words)`;
      
      case 'set':
        return `# Python Set implementation
class Set:
    def __init__(self):
        self.data = set()
    
    def add(self, element):
        """Add element to set"""
        self.data.add(element)
    
    def remove(self, element):
        """Remove element from set"""
        if element in self.data:
            self.data.remove(element)
        else:
            raise KeyError(f"Element {element} not found")
    
    def contains(self, element):
        """Check if element is in set"""
        return element in self.data
    
    def union(self, other_set):
        """Return union with another set"""
        return self.data.union(other_set.data)
    
    def intersection(self, other_set):
        """Return intersection with another set"""
        return self.data.intersection(other_set.data)
    
    def difference(self, other_set):
        """Return difference with another set"""
        return self.data.difference(other_set.data)
    
    def size(self):
        """Return number of elements"""
        return len(self.data)
    
    def is_empty(self):
        """Check if set is empty"""
        return len(self.data) == 0`;
      
      default:
        return `# Python implementation
class ${structureName}:
    def __init__(self):
        self.data = []
    
    # Basic operations
    def insert(self, value):
        # Implementation
        pass
    
    def delete(self, value):
        # Implementation
        pass
    
    def search(self, value):
        # Implementation
        pass`;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Data Structures
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master fundamental data structures with interactive visualizations and detailed Python implementations.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Choose Structure
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {dataStructures.map((structure) => (
                <button
                  key={structure.id}
                  onClick={() => setSelectedStructure(structure.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedStructure === structure.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{structure.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {structure.description.substring(0, 60)}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          {currentStructure && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Time Complexity
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Access:</span>
                  <span className="font-mono text-primary-600">{currentStructure.complexity.access}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Search:</span>
                  <span className="font-mono text-primary-600">{currentStructure.complexity.search}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insertion:</span>
                  <span className="font-mono text-primary-600">{currentStructure.complexity.insertion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deletion:</span>
                  <span className="font-mono text-primary-600">{currentStructure.complexity.deletion}</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          {currentStructure && (
            <>
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentStructure.name}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span>{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <button className="btn-secondary flex items-center space-x-2">
                      <RotateCcw className="h-4 w-4" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{currentStructure.description}</p>

                {/* Visualization */}
                {VisualizationComponent && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Interactive Visualization
                    </h3>
                    <VisualizationComponent 
                      isPlaying={isPlaying} 
                      onReset={() => setIsPlaying(false)}
                    />
                  </div>
                )}

                {/* Use Cases */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Common Use Cases
                  </h3>
                  <ul className="space-y-2">
                    {currentStructure.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary-600" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Code Example */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Python Implementation
                </h3>
                <div className="code-block">
                  <pre className="text-sm">
{getPythonExample(currentStructure.name)}
                  </pre>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DataStructures; 