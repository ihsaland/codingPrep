import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Database, Brain, Play, Target, Clock, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Database,
      title: 'Data Structures',
      description: 'Master arrays, linked lists, trees, graphs, and more with interactive visualizations.',
      color: 'bg-blue-500',
    },
    {
      icon: Brain,
      title: 'Algorithms',
      description: 'Learn sorting, searching, dynamic programming, and other essential algorithms.',
      color: 'bg-green-500',
    },
    {
      icon: Play,
      title: 'Practice Problems',
      description: 'Solve real interview questions with step-by-step guidance and explanations.',
      color: 'bg-purple-500',
    },
    {
      icon: Code,
      title: 'Code Editor',
      description: 'Write, run, and debug code in a real-time environment with syntax highlighting.',
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    { label: 'Data Structures', value: '10', icon: Database },
    { label: 'Algorithms', value: '10', icon: Brain },
    { label: 'Practice Problems', value: '20', icon: Play },
    { label: 'Interview Topics', value: '30+', icon: Target },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
          Master Your
          <span className="text-primary-600"> Coding Interview</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Interactive learning platform for data structures, algorithms, and coding interview preparation. 
          Visualize concepts, practice problems, and build confidence for your next technical interview.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/data-structures"
            className="btn-primary text-lg px-8 py-3"
          >
            Start Learning
          </Link>
          <Link
            to="/practice"
            className="btn-secondary text-lg px-8 py-3"
          >
            Practice Problems
          </Link>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card text-center">
              <Icon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="card text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Interview?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of developers who have successfully prepared for their coding interviews.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/code-editor"
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Start Coding Now
          </Link>
          <Link
            to="/algorithms"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Learn Algorithms
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 