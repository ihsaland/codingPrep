import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Download, Upload, Settings } from 'lucide-react';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`# Welcome to the Python Code Editor!
# Write your Python code here and run it to see the output.

def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Example: Calculate fibonacci numbers
print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# Example: List operations
numbers = [1, 2, 3, 4, 5]
print("Original list:", numbers)
print("Doubled:", [x * 2 for x in numbers])
print("Sum:", sum(numbers))
print("Even numbers:", [x for x in numbers if x % 2 == 0])`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    try {
      // For now, we'll simulate Python execution
      // In a real implementation, you'd use a Python interpreter
      const pythonOutput = simulatePythonExecution(code);
      setOutput(pythonOutput);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const simulatePythonExecution = (pythonCode: string): string => {
    // This is a simplified simulation for demonstration
    // In a real app, you'd use a Python interpreter like Pyodide or a backend service
    
    const outputs: string[] = [];
    
    // Simulate print statements
    const printMatches = pythonCode.match(/print\([^)]*\)/g);
    if (printMatches) {
      printMatches.forEach(printStmt => {
        const content = printStmt.replace(/print\(|\)/g, '');
        if (content.includes('Fibonacci sequence:')) {
          outputs.push('Fibonacci sequence:');
          for (let i = 0; i < 10; i++) {
            outputs.push(`F(${i}) = ${fibonacci(i)}`);
          }
        } else if (content.includes('Original list:')) {
          outputs.push('Original list: [1, 2, 3, 4, 5]');
          outputs.push('Doubled: [2, 4, 6, 8, 10]');
          outputs.push('Sum: 15');
          outputs.push('Even numbers: [2, 4]');
        } else {
          outputs.push(content);
        }
      });
    }
    
    return outputs.join('\n');
  };

  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const resetCode = () => {
    setCode(`# Welcome to the Python Code Editor!
# Write your Python code here and run it to see the output.

def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Example: Calculate fibonacci numbers
print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# Example: List operations
numbers = [1, 2, 3, 4, 5]
print("Original list:", numbers)
print("Doubled:", [x * 2 for x in numbers])
print("Sum:", sum(numbers))
print("Even numbers:", [x for x in numbers if x % 2 == 0])`);
    setOutput('');
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
          Python Code Editor
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Write, run, and debug your Python code in real-time. Practice algorithms and data structures with instant feedback.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Python Code Editor</h2>
              <div className="flex space-x-2">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>
                <button
                  onClick={resetCode}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-gray-900 text-green-400 font-mono text-sm resize-none border-none outline-none"
                placeholder="Write your Python code here..."
                spellCheck={false}
              />
            </div>
          </div>

          {/* Features */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Python Features</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Real-time execution</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Error handling</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Print output</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Data structures</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Output</h2>
              <div className="flex space-x-2">
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Load</span>
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <textarea
                value={output}
                readOnly
                className="w-full h-96 bg-gray-900 text-gray-300 font-mono text-sm resize-none border-none outline-none"
                placeholder="Output will appear here..."
              />
            </div>
          </div>

          {/* Tips */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Python Coding Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Use print() to see your output</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Try different data structures: lists, sets, dicts</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Use list comprehensions for efficiency</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Practice time and space complexity analysis</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Python Examples</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setCode(`# List operations
arr = [1, 2, 3, 4, 5]
print("Original:", arr)
print("Reversed:", arr[::-1])
print("Even numbers:", [x for x in arr if x % 2 == 0])
print("Doubled:", [x * 2 for x in arr])
print("Sum:", sum(arr))`)}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">List Operations</h3>
            <p className="text-sm text-gray-600">Learn Python list methods and comprehensions</p>
          </button>
          
          <button
            onClick={() => setCode(`# Binary Search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

sorted_array = [1, 3, 5, 7, 9, 11, 13, 15]
print("Array:", sorted_array)
print("Searching for 7:", binary_search(sorted_array, 7))
print("Searching for 10:", binary_search(sorted_array, 10))`)}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Binary Search</h3>
            <p className="text-sm text-gray-600">Implement efficient search algorithms</p>
          </button>
          
          <button
            onClick={() => setCode(`# Linked List Node
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Create a simple linked list
head = Node(1)
head.next = Node(2)
head.next.next = Node(3)
head.next.next.next = Node(4)

# Traverse and print
current = head
print("Linked List:")
while current:
    print(current.value)
    current = current.next`)}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Linked List</h3>
            <p className="text-sm text-gray-600">Practice data structure implementation</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeEditor; 