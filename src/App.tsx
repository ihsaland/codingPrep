import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DataStructures from './pages/DataStructures';
import Algorithms from './pages/Algorithms';
import Practice from './pages/Practice';
import CodeEditor from './pages/CodeEditor';
import PythonSyntax from './pages/PythonSyntax';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/data-structures" element={<DataStructures />} />
              <Route path="/algorithms" element={<Algorithms />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/code-editor" element={<CodeEditor />} />
              <Route path="/python-syntax" element={<PythonSyntax />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
};

export default App; 