# Coding Interview Preparation Platform

A comprehensive interactive learning platform for coding interview preparation, featuring data structures, algorithms, practice problems, and Python syntax reference.

## 🚀 Features

### 📊 **Data Structures (10)**
- **Basic Structures**: Array/List, Linked List, Stack, Queue, Binary Tree
- **Advanced Structures**: Hash Table, Graph, Heap, Trie, Set
- **Interactive Visualizations**: Real-time animations for each data structure
- **Python Implementations**: Complete code examples for all structures

### 🧠 **Algorithms (10)**
- **Sorting**: Bubble Sort, Quick Sort, Merge Sort, Insertion Sort, Selection Sort, Heap Sort
- **Searching**: Binary Search, Linear Search
- **Graph Algorithms**: Depth-First Search, Breadth-First Search
- **Interactive Visualizations**: Step-by-step algorithm demonstrations
- **Complexity Analysis**: Time and space complexity for each algorithm

### 💻 **Practice Problems (20)**
- **Easy Problems (12)**: Two Sum, Valid Parentheses, Binary Search, etc.
- **Medium Problems (5)**: Longest Substring, Container With Most Water, 3Sum, etc.
- **Hard Problems (3)**: Median of Two Sorted Arrays, Regular Expression Matching, etc.
- **Complete Solutions**: Python implementations with detailed explanations
- **Complexity Analysis**: Time and space complexity for each solution

### 📚 **Python Syntax Reference**
- **Basic Syntax**: Variables, control flow, functions
- **Advanced Features**: Decorators, generators, context managers
- **OOP Concepts**: Classes, inheritance, magic methods, properties
- **Functional Programming**: Higher-order functions, closures, currying
- **Modules & Packages**: Import statements, package creation, virtual environments
- **Printable Cheat Sheet**: Complete reference for offline use

### 🔧 **Code Editor**
- **Real-time Execution**: Python code simulation
- **Syntax Highlighting**: Enhanced code readability
- **Example Snippets**: Pre-built code examples
- **Output Display**: Real-time results and error handling

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router DOM for navigation
- **Code Editor**: Monaco Editor (planned integration)

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coding-interview-prep
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   └── visualizations/
│       ├── ArrayVisualization.tsx
│       ├── LinkedListVisualization.tsx
│       ├── StackVisualization.tsx
│       ├── QueueVisualization.tsx
│       ├── TreeVisualization.tsx
│       ├── BubbleSortVisualization.tsx
│       ├── QuickSortVisualization.tsx
│       └── BinarySearchVisualization.tsx
├── pages/
│   ├── Home.tsx
│   ├── DataStructures.tsx
│   ├── Algorithms.tsx
│   ├── Practice.tsx
│   ├── CodeEditor.tsx
│   └── PythonSyntax.tsx
├── App.tsx
├── index.tsx
└── index.css
```

## 🎯 Usage Guide

### Learning Data Structures
1. Navigate to **Data Structures** tab
2. Select a data structure from the sidebar
3. Watch interactive visualizations
4. Study Python implementations
5. Review complexity analysis

### Mastering Algorithms
1. Go to **Algorithms** tab
2. Choose an algorithm to study
3. Observe step-by-step visualizations
4. Understand time/space complexity
5. Practice implementations

### Solving Practice Problems
1. Visit **Practice** tab
2. Select problems by difficulty
3. Read problem descriptions and examples
4. Try solving in the Code Editor
5. Compare with provided solutions

### Python Syntax Reference
1. Access **Python Syntax** tab
2. Browse categories (Basic, Advanced, OOP, etc.)
3. Study code examples and explanations
4. Print cheat sheet for offline reference

### Using the Code Editor
1. Navigate to **Code Editor** tab
2. Write or paste Python code
3. Click "Run Code" to execute
4. View output and error messages
5. Experiment with different algorithms

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📊 Content Overview

### Data Structures Coverage
- **Arrays/Lists**: Access, search, insertion, deletion operations
- **Linked Lists**: Node traversal, insertion, deletion
- **Stacks**: LIFO operations with push/pop
- **Queues**: FIFO operations with enqueue/dequeue
- **Trees**: Binary tree traversal and operations
- **Hash Tables**: Key-value storage and collision handling
- **Graphs**: Adjacency lists, DFS, BFS
- **Heaps**: Priority queue operations
- **Tries**: String storage and prefix matching
- **Sets**: Unique element collections

### Algorithm Categories
- **Sorting Algorithms**: 6 different sorting methods
- **Searching Algorithms**: 2 search techniques
- **Graph Algorithms**: 2 traversal methods

### Practice Problem Categories
- **Arrays**: 4 problems covering various array operations
- **Strings**: 2 problems with string manipulation
- **Linked Lists**: 2 problems with list operations
- **Trees**: 1 problem with tree traversal
- **Dynamic Programming**: 2 problems with DP concepts
- **Math**: 2 problems with mathematical operations
- **Search**: 1 problem with search algorithms
- **Stack**: 1 problem with stack operations

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Clean, modern interface
- **Smooth Animations**: Framer Motion transitions
- **Interactive Elements**: Hover effects and feedback
- **Accessibility**: Keyboard navigation and screen reader support

## 🔧 Development

### Adding New Content
1. **Data Structures**: Add to `src/pages/DataStructures.tsx`
2. **Algorithms**: Add to `src/pages/Algorithms.tsx`
3. **Practice Problems**: Add to `src/pages/Practice.tsx`
4. **Visualizations**: Create new components in `src/components/visualizations/`

### Code Style
- Use TypeScript for type safety
- Follow React functional component patterns
- Use Tailwind CSS for styling
- Implement responsive design principles

## 📈 Roadmap

### Planned Features
- [ ] **User Authentication**: Login/signup system
- [ ] **Progress Tracking**: Save completed problems
- [ ] **Real Python Execution**: Integrate Python interpreter
- [ ] **More Visualizations**: Additional algorithm animations
- [ ] **Mobile App**: React Native version
- [ ] **Backend API**: User data and progress storage
- [ ] **Community Features**: Discussion forums
- [ ] **Interview Simulator**: Timed coding challenges

### Content Expansion
- [ ] **More Data Structures**: Advanced tree types, graphs
- [ ] **Additional Algorithms**: Dynamic programming, greedy algorithms
- [ ] **System Design**: Architecture and design patterns
- [ ] **Behavioral Questions**: Interview preparation guides
- [ ] **Company-Specific**: Tailored content for top tech companies

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and enhancement requests.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **Lucide React**: For beautiful icons
- **Create React App**: For the development setup

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Happy Coding! 🚀** 