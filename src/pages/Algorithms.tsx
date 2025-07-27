import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';
import BubbleSortVisualization from '../components/visualizations/BubbleSortVisualization';
import QuickSortVisualization from '../components/visualizations/QuickSortVisualization';
import BinarySearchVisualization from '../components/visualizations/BinarySearchVisualization';
import MergeSortVisualization from '../components/visualizations/MergeSortVisualization';
import LinearSearchVisualization from '../components/visualizations/LinearSearchVisualization';
import DepthFirstSearchVisualization from '../components/visualizations/DepthFirstSearchVisualization';
import BreadthFirstSearchVisualization from '../components/visualizations/BreadthFirstSearchVisualization';
import InsertionSortVisualization from '../components/visualizations/InsertionSortVisualization';
import SelectionSortVisualization from '../components/visualizations/SelectionSortVisualization';
import HeapSortVisualization from '../components/visualizations/HeapSortVisualization';

const Algorithms: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const [isPlaying, setIsPlaying] = useState(false);

  const algorithms = [
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      complexity: {
        time: 'O(n²)',
        space: 'O(1)'
      },
      useCases: ['Educational purposes', 'Small datasets', 'Nearly sorted data'],
      steps: [
        'Compare adjacent elements',
        'Swap if they are in wrong order',
        'Repeat until no swaps needed'
      ],
      visualization: BubbleSortVisualization
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      description: 'A highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy.',
      complexity: {
        time: 'O(n log n)',
        space: 'O(log n)'
      },
      useCases: ['Large datasets', 'General-purpose sorting', 'In-place sorting'],
      steps: [
        'Choose a pivot element',
        'Partition around pivot',
        'Recursively sort subarrays'
      ],
      visualization: QuickSortVisualization
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      description: 'An efficient algorithm for finding an element in a sorted array by repeatedly dividing the search interval in half.',
      complexity: {
        time: 'O(log n)',
        space: 'O(1)'
      },
      useCases: ['Sorted arrays', 'Database queries', 'Game development'],
      steps: [
        'Find middle element',
        'Compare with target',
        'Eliminate half of remaining elements'
      ],
      visualization: BinarySearchVisualization
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      description: 'A stable, divide-and-conquer sorting algorithm that produces a sorted array by merging sorted subarrays.',
      complexity: {
        time: 'O(n log n)',
        space: 'O(n)'
      },
      useCases: ['External sorting', 'Linked list sorting', 'Stable sorting required'],
      steps: [
        'Divide array into halves',
        'Recursively sort halves',
        'Merge sorted halves'
      ],
      visualization: MergeSortVisualization
    },
    {
      id: 'linear-search',
      name: 'Linear Search',
      description: 'A simple search algorithm that checks each element in the list sequentially until the target is found.',
      complexity: {
        time: 'O(n)',
        space: 'O(1)'
      },
      useCases: ['Unsorted arrays', 'Small datasets', 'Simple implementations'],
      steps: [
        'Start from first element',
        'Compare with target',
        'Move to next element if not found'
      ],
      visualization: LinearSearchVisualization
    },
    {
      id: 'depth-first-search',
      name: 'Depth-First Search',
      description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      },
      useCases: ['Graph traversal', 'Maze solving', 'Topological sorting'],
      steps: [
        'Start at root node',
        'Explore as deep as possible',
        'Backtrack when no more options'
      ],
      visualization: DepthFirstSearchVisualization
    },
    {
      id: 'breadth-first-search',
      name: 'Breadth-First Search',
      description: 'A graph traversal algorithm that explores all vertices at the present depth before moving to vertices at the next depth level.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      },
      useCases: ['Shortest path', 'Web crawling', 'GPS navigation'],
      steps: [
        'Start at root node',
        'Visit all neighbors',
        'Move to next level'
      ],
      visualization: BreadthFirstSearchVisualization
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      description: 'A simple sorting algorithm that builds the final sorted array one item at a time.',
      complexity: {
        time: 'O(n²)',
        space: 'O(1)'
      },
      useCases: ['Small datasets', 'Nearly sorted data', 'Online sorting'],
      steps: [
        'Start with second element',
        'Insert into sorted portion',
        'Shift elements as needed'
      ],
      visualization: InsertionSortVisualization
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      description: 'A simple sorting algorithm that divides the input into a sorted and unsorted region.',
      complexity: {
        time: 'O(n²)',
        space: 'O(1)'
      },
      useCases: ['Small datasets', 'Minimal memory usage', 'Educational purposes'],
      steps: [
        'Find minimum in unsorted region',
        'Swap with first unsorted element',
        'Expand sorted region'
      ],
      visualization: SelectionSortVisualization
    },
    {
      id: 'heap-sort',
      name: 'Heap Sort',
      description: 'A comparison-based sorting algorithm that uses a binary heap data structure.',
      complexity: {
        time: 'O(n log n)',
        space: 'O(1)'
      },
      useCases: ['In-place sorting', 'Priority queue implementation', 'Memory-constrained systems'],
      steps: [
        'Build max heap',
        'Extract maximum repeatedly',
        'Place in sorted portion'
      ],
      visualization: HeapSortVisualization
    }
  ];

  const currentAlgorithm = algorithms.find(algo => algo.id === selectedAlgorithm);
  const VisualizationComponent = currentAlgorithm?.visualization;

  const getPythonImplementation = (algorithmName: string) => {
    switch (algorithmName.toLowerCase()) {
      case 'bubble sort':
        return `def bubble_sort(arr):
    """Bubble Sort implementation"""
    n = len(arr)
    for i in range(n):
        # Flag to optimize - if no swaps, array is sorted
        swapped = False
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if they are in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no swapping occurred, array is sorted
        if not swapped:
            break
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")`;
      
      case 'quick sort':
        return `def quick_sort(arr):
    """Quick Sort implementation"""
    if len(arr) <= 1:
        return arr
    
    # Choose pivot (middle element)
    pivot = arr[len(arr) // 2]
    
    # Partition elements
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # Recursively sort and combine
    return quick_sort(left) + middle + quick_sort(right)

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = quick_sort(arr)
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")`;
      
      case 'binary search':
        return `def binary_search(arr, target):
    """Binary Search implementation"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # Found target
        if arr[mid] == target:
            return mid
        # Target is in left half
        elif arr[mid] > target:
            right = mid - 1
        # Target is in right half
        else:
            left = mid + 1
    
    # Target not found
    return -1

# Example usage
arr = [1, 3, 5, 7, 9, 11, 13, 15]
target = 7
result = binary_search(arr, target)
print(f"Array: {arr}")
print(f"Target: {target}")
print(f"Found at index: {result}")`;
      
      case 'merge sort':
        return `def merge_sort(arr):
    """Merge Sort implementation"""
    if len(arr) <= 1:
        return arr
    
    # Divide array into halves
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge sorted halves
    return merge(left, right)

def merge(left, right):
    """Merge two sorted arrays"""
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = merge_sort(arr)
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")`;
      
      case 'linear search':
        return `def linear_search(arr, target):
    """Linear Search implementation"""
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
target = 25
result = linear_search(arr, target)
print(f"Array: {arr}")
print(f"Target: {target}")
print(f"Found at index: {result}")`;
      
      case 'depth-first search':
        return `from collections import defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        self.graph[u].append(v)
    
    def dfs(self, start, visited=None):
        """Depth-First Search implementation"""
        if visited is None:
            visited = set()
        
        visited.add(start)
        print(start, end=' ')
        
        for neighbor in self.graph[start]:
            if neighbor not in visited:
                self.dfs(neighbor, visited)
        
        return visited

# Example usage
g = Graph()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 2)
g.add_edge(2, 0)
g.add_edge(2, 3)
g.add_edge(3, 3)

print("DFS starting from vertex 2:")
g.dfs(2)`;
      
      case 'breadth-first search':
        return `from collections import defaultdict, deque

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        self.graph[u].append(v)
    
    def bfs(self, start):
        """Breadth-First Search implementation"""
        visited = set()
        queue = deque([start])
        visited.add(start)
        
        while queue:
            vertex = queue.popleft()
            print(vertex, end=' ')
            
            for neighbor in self.graph[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return visited

# Example usage
g = Graph()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 2)
g.add_edge(2, 0)
g.add_edge(2, 3)
g.add_edge(3, 3)

print("BFS starting from vertex 2:")
g.bfs(2)`;
      
      case 'insertion sort':
        return `def insertion_sort(arr):
    """Insertion Sort implementation"""
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = insertion_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")`;
      
      case 'selection sort':
        return `def selection_sort(arr):
    """Selection Sort implementation"""
    for i in range(len(arr)):
        # Find minimum element in unsorted portion
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap with first element of unsorted portion
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = selection_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")`;
      
      case 'heap sort':
        return `import heapq

def heap_sort(arr):
    """Heap Sort implementation using heapq"""
    # Build min heap
    heapq.heapify(arr)
    
    # Extract elements one by one
    sorted_arr = []
    while arr:
        sorted_arr.append(heapq.heappop(arr))
    
    return sorted_arr

# Alternative implementation without heapq
def heap_sort_manual(arr):
    """Manual Heap Sort implementation"""
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and arr[left] > arr[largest]:
            largest = left
        
        if right < n and arr[right] > arr[largest]:
            largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)
    
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = heap_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")`;
      
      default:
        return `# Python implementation for ${algorithmName}
def ${algorithmName.replace(/\s+/g, '_')}(arr):
    """${algorithmName} implementation"""
    # Implementation here
    pass

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
result = ${algorithmName.replace(/\s+/g, '_')}(arr)
print(f"Result: {result}")`;
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
          Algorithms
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master fundamental algorithms with step-by-step explanations, complexity analysis, and interactive visualizations.
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
              <Brain className="h-5 w-5 mr-2" />
              Choose Algorithm
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {algorithms.map((algorithm) => (
                <button
                  key={algorithm.id}
                  onClick={() => setSelectedAlgorithm(algorithm.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedAlgorithm === algorithm.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{algorithm.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {algorithm.description.substring(0, 60)}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          {currentAlgorithm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Complexity Analysis
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Complexity:</span>
                  <span className="font-mono text-primary-600">{currentAlgorithm.complexity.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Space Complexity:</span>
                  <span className="font-mono text-primary-600">{currentAlgorithm.complexity.space}</span>
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
          {currentAlgorithm && (
            <>
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentAlgorithm.name}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span>{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setTimeout(() => setIsPlaying(true), 100);
                      }}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{currentAlgorithm.description}</p>

                {/* Interactive Visualization */}
                {VisualizationComponent && (
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Interactive Visualization
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <VisualizationComponent 
                        isPlaying={isPlaying} 
                        onReset={() => setIsPlaying(false)}
                      />
                    </div>
                  </div>
                )}

                {/* Algorithm Steps */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Algorithm Steps
                  </h3>
                  <ol className="space-y-2">
                    {currentAlgorithm.steps.map((step, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <span className="bg-primary-100 text-primary-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Use Cases */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Common Use Cases
                  </h3>
                  <ul className="space-y-2">
                    {currentAlgorithm.useCases.map((useCase, index) => (
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
{getPythonImplementation(currentAlgorithm.name)}
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

export default Algorithms; 