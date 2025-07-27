import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Download, BookOpen, Zap, Database, Brain, Play } from 'lucide-react';

const PythonSyntax: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const syntaxCategories = [
    {
      id: 'basics',
      name: 'Basic Syntax',
      icon: Code,
      examples: [
        {
          title: 'Variables and Data Types',
          code: `# Numbers
x = 10          # int
y = 3.14        # float
z = 2 + 3j      # complex

# Strings
name = "Python"
message = 'Hello, World!'
multi_line = """
Multi-line
string
"""

# Booleans
is_true = True
is_false = False

# Lists (mutable)
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Tuples (immutable)
coordinates = (10, 20)
rgb = (255, 128, 0)

# Dictionaries
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Sets
unique_numbers = {1, 2, 3, 4, 5}
fruits = {"apple", "banana", "orange"}`,
          description: 'Fundamental data types and variable assignment in Python.'
        },
        {
          title: 'Control Flow',
          code: `# If statements
x = 10
if x > 5:
    print("x is greater than 5")
elif x == 5:
    print("x is equal to 5")
else:
    print("x is less than 5")

# For loops
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for item in ["apple", "banana", "orange"]:
    print(item)

# While loops
count = 0
while count < 5:
    print(count)
    count += 1

# List comprehensions
squares = [x**2 for x in range(5)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]`,
          description: 'Conditional statements and loop constructs.'
        },
        {
          title: 'Functions',
          code: `# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameters
def power(base, exponent=2):
    return base ** exponent

# Function with multiple return values
def get_coordinates():
    return 10, 20

# Lambda functions
square = lambda x: x**2
add = lambda x, y: x + y

# Function with type hints
def calculate_area(length: float, width: float) -> float:
    return length * width`,
          description: 'Function definitions, parameters, and lambda expressions.'
        }
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Features',
      icon: Zap,
      examples: [
        {
          title: 'Decorators',
          code: `# Simple decorator
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

# Using decorator
@timer
def slow_function():
    import time
    time.sleep(1)
    return "Done!"

# Decorator with parameters
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")`,
          description: 'Decorators for function modification and metaprogramming.'
        },
        {
          title: 'Generators',
          code: `# Generator function
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Using generator
for num in fibonacci(10):
    print(num)

# Generator expression
squares = (x**2 for x in range(5))

# Infinite generator
def infinite_counter():
    num = 0
    while True:
        yield num
        num += 1

# Generator with send()
def counter():
    count = 0
    while True:
        val = yield count
        if val is not None:
            count = val
        else:
            count += 1`,
          description: 'Generators for memory-efficient iteration and lazy evaluation.'
        },
        {
          title: 'Context Managers',
          code: `# Using with statement
with open('file.txt', 'r') as file:
    content = file.read()

# Custom context manager
class Timer:
    def __init__(self, name):
        self.name = name
    
    def __enter__(self):
        import time
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        end = time.time()
        print(f"{self.name} took {end - self.start:.4f} seconds")

# Using custom context manager
with Timer("my_function"):
    # Some code here
    pass

# Context manager with @contextmanager
from contextlib import contextmanager

@contextmanager
def timer(name):
    import time
    start = time.time()
    yield
    end = time.time()
    print(f"{name} took {end - start:.4f} seconds")`,
          description: 'Context managers for resource management and cleanup.'
        }
      ]
    },
    {
      id: 'oop',
      name: 'Object-Oriented Programming',
      icon: Database,
      examples: [
        {
          title: 'Classes and Objects',
          code: `# Basic class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}"
    
    def have_birthday(self):
        self.age += 1
        return f"Happy birthday! I'm now {self.age}"

# Creating objects
person = Person("Alice", 30)
print(person.greet())

# Inheritance
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
    
    def study(self):
        return f"{self.name} is studying"

# Multiple inheritance
class TeachingAssistant(Student, Person):
    def __init__(self, name, age, student_id, subject):
        Student.__init__(self, name, age, student_id)
        self.subject = subject`,
          description: 'Class definitions, inheritance, and object-oriented concepts.'
        },
        {
          title: 'Magic Methods',
          code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)
    
    def __getitem__(self, key):
        if key == 0:
            return self.x
        elif key == 1:
            return self.y
        raise IndexError("Vector index out of range")

# Using magic methods
v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)  # Vector(4, 6)
print(len(v1))  # 5
print(v1[0])    # 3`,
          description: 'Special methods for operator overloading and object behavior.'
        },
        {
          title: 'Properties and Descriptors',
          code: `class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value
    
    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2
    
    @property
    def circumference(self):
        import math
        return 2 * math.pi * self._radius

# Using properties
circle = Circle(5)
print(circle.area)  # 78.54...
circle.radius = 10
print(circle.circumference)  # 62.83...`,
          description: 'Properties for controlled attribute access and computed values.'
        }
      ]
    },
    {
      id: 'functional',
      name: 'Functional Programming',
      icon: Brain,
      examples: [
        {
          title: 'Higher-Order Functions',
          code: `# Map function
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))

# Filter function
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))

# Reduce function
from functools import reduce
sum_all = reduce(lambda x, y: x + y, numbers)

# Custom higher-order function
def compose(*functions):
    def inner(arg):
        for f in reversed(functions):
            arg = f(arg)
        return arg
    return inner

# Using compose
def add_one(x): return x + 1
def multiply_by_two(x): return x * 2
def square(x): return x ** 2

composed = compose(square, multiply_by_two, add_one)
result = composed(3)  # ((3 + 1) * 2)² = 64`,
          description: 'Functions that take or return other functions.'
        },
        {
          title: 'Closures and Currying',
          code: `# Closure
def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

counter1 = make_counter()
counter2 = make_counter()
print(counter1())  # 1
print(counter1())  # 2
print(counter2())  # 1

# Currying
def curry(func):
    def curried(*args):
        if len(args) >= func.__code__.co_argcount:
            return func(*args)
        return lambda *more_args: curried(*(args + more_args))
    return curried

@curry
def add_three(a, b, c):
    return a + b + c

# Using curried function
add_5_and_3 = add_three(5)(3)
result = add_5_and_3(2)  # 10`,
          description: 'Closures for state preservation and currying for partial application.'
        },
        {
          title: 'Iterators and Iterables',
          code: `# Custom iterator
class CountDown:
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1

# Using custom iterator
for num in CountDown(5):
    print(num)  # 5, 4, 3, 2, 1

# Iterator tools
from itertools import count, cycle, repeat, chain

# Infinite counter
for i in count(10):
    if i > 15:
        break
    print(i)  # 10, 11, 12, 13, 14, 15

# Cycle through elements
colors = cycle(['red', 'green', 'blue'])
for i, color in enumerate(colors):
    if i >= 6:
        break
    print(color)  # red, green, blue, red, green, blue

# Chain iterables
combined = chain([1, 2, 3], [4, 5, 6])
print(list(combined))  # [1, 2, 3, 4, 5, 6]`,
          description: 'Custom iterators and itertools for advanced iteration patterns.'
        }
      ]
    },
    {
      id: 'modules',
      name: 'Modules and Packages',
      icon: BookOpen,
      examples: [
        {
          title: 'Import Statements',
          code: `# Basic imports
import math
import os
import sys

# Import specific items
from math import pi, sqrt
from datetime import datetime, timedelta

# Import with alias
import numpy as np
import pandas as pd

# Import all (not recommended)
from math import *

# Relative imports (in packages)
from .utils import helper_function
from ..parent_module import parent_function

# Conditional imports
try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False

# Lazy imports
def expensive_import():
    import heavy_module
    return heavy_module`,
          description: 'Different ways to import modules and handle dependencies.'
        },
        {
          title: 'Creating Packages',
          code: `# Directory structure:
# mypackage/
# ├── __init__.py
# ├── core.py
# ├── utils.py
# └── subpackage/
#     ├── __init__.py
#     └── helpers.py

# __init__.py
from .core import main_function
from .utils import helper_function

__version__ = "1.0.0"
__author__ = "Your Name"

# core.py
def main_function():
    return "Hello from main function"

# utils.py
def helper_function():
    return "Helper function"

# subpackage/__init__.py
from .helpers import sub_function

# subpackage/helpers.py
def sub_function():
    return "Sub function"`,
          description: 'Package structure and organization for reusable code.'
        },
        {
          title: 'Virtual Environments',
          code: `# Creating virtual environment
# python -m venv myenv

# Activating virtual environment
# On Windows:
# myenv\\Scripts\\activate

# On macOS/Linux:
# source myenv/bin/activate

# Installing packages
# pip install package_name
# pip install -r requirements.txt

# requirements.txt example:
# numpy==1.21.0
# pandas>=1.3.0
# requests

# Deactivating
# deactivate

# Using pipenv
# pipenv install package_name
# pipenv shell

# Using conda
# conda create -n myenv python=3.9
# conda activate myenv
# conda install package_name`,
          description: 'Environment management and dependency handling.'
        }
      ]
    }
  ];

  const currentCategory = syntaxCategories.find(cat => cat.id === selectedCategory);

  const generateCheatSheet = () => {
    const cheatSheetContent = `
# Python Syntax Cheat Sheet

## Basic Syntax
### Variables and Data Types
x = 10                    # int
y = 3.14                  # float
name = "Python"           # string
is_true = True            # boolean
numbers = [1, 2, 3]      # list
coordinates = (10, 20)    # tuple
person = {"name": "John"} # dict
unique = {1, 2, 3}       # set

### Control Flow
if x > 5:
    print("Greater")
elif x == 5:
    print("Equal")
else:
    print("Less")

for i in range(5):
    print(i)

while count < 5:
    count += 1

### Functions
def greet(name):
    return f"Hello, {name}!"

lambda_func = lambda x: x**2

## Advanced Features
### Decorators
@timer
def slow_function():
    pass

### Generators
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

### Context Managers
with open('file.txt') as f:
    content = f.read()

## OOP
class Person:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        return f"Hello, {self.name}!"

## Functional Programming
squares = map(lambda x: x**2, numbers)
evens = filter(lambda x: x % 2 == 0, numbers)
total = reduce(lambda x, y: x + y, numbers)

## Common Patterns
# List comprehension
squares = [x**2 for x in range(5)]

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}

# Set comprehension
unique_squares = {x**2 for x in range(5)}

# Generator expression
squares_gen = (x**2 for x in range(5))

## Error Handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Error: {e}")
finally:
    print("Cleanup")

## File Operations
with open('file.txt', 'r') as f:
    content = f.read()

with open('output.txt', 'w') as f:
    f.write("Hello, World!")

## Common Libraries
import os
import sys
import math
import datetime
import json
import requests
import numpy as np
import pandas as pd

## Best Practices
# Use meaningful variable names
user_age = 25  # Good
ua = 25        # Bad

# Use type hints
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Use docstrings
def calculate_area(length: float, width: float) -> float:
    """Calculate the area of a rectangle.
    
    Args:
        length: The length of the rectangle
        width: The width of the rectangle
    
    Returns:
        The area of the rectangle
    """
    return length * width
    `;
    
    return cheatSheetContent;
  };

  const printCheatSheet = () => {
    const content = generateCheatSheet();
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Python Syntax Cheat Sheet</title>
            <style>
              body { font-family: 'Courier New', monospace; line-height: 1.6; margin: 20px; }
              pre { background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto; }
              h1, h2, h3 { color: #333; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <pre>${content}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
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
          Python Syntax Reference
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive Python syntax guide with basic to advanced features, decorators, generators, and more.
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={printCheatSheet}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Print Cheat Sheet</span>
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Categories
            </h2>
            <div className="space-y-2">
              {syntaxCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3 space-y-6"
        >
          {currentCategory && (
            <>
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentCategory.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const Icon = currentCategory.icon;
                      return <Icon className="h-6 w-6 text-primary-600" />;
                    })()}
                  </div>
                </div>

                <div className="space-y-8">
                  {currentCategory.examples.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="card"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {example.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {example.description}
                      </p>
                      <div className="code-block">
                        <pre className="text-sm">
{example.code}
                        </pre>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PythonSyntax; 