'use client';

import { motion } from 'framer-motion';
import { Code, Zap, Brain, Target, ArrowRight, Github, Star } from 'lucide-react';
import Link from 'next/link';
import { categoriesMeta } from '@/data/categories';
import { allProblems } from '@/data/problems';

// Home page uses categories list for the Explore by Category section

const features = [
  {
    icon: <Code className="w-6 h-6" />,
    title: 'Step-by-Step Visualizations',
    description: 'Watch algorithms execute with detailed explanations'
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Custom Input Support',
    description: 'Test algorithms with your own data'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Multiple Algorithms',
    description: 'Arrays, trees, linked lists, and more'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">LeetCode Visualizer</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-4"
            >
              <Link href="/problems" className="text-gray-300 hover:text-white transition-colors">
                Problems
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/problems" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors inline-block">
                Problems
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Algorithm Visualizer
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Visualize how algorithms work with interactive step-by-step demonstrations. 
              Perfect for understanding data structures and algorithm patterns.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/problems" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition-colors inline-flex items-center">
                Browse Problems
                <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </Link>
              <button className="border border-gray-600 hover:border-gray-500 px-6 py-3 rounded-lg text-gray-300 hover:text-white transition-colors">
                <Github className="inline-block mr-2 w-4 h-4" />
                GitHub
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-cyan-500/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Learn algorithms the visual way with interactive demonstrations and comprehensive explanations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
              <div className="text-blue-500 mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Browse problems organized by algorithm types and difficulty levels.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoriesMeta.map((cat, index) => {
              const count = allProblems.filter((p) => p.category === cat.slug).length;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/categories/${cat.slug}`}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                      <div className="text-4xl mb-3">{cat.icon}</div>
                      <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${cat.color} text-white`}>
                        {count} questions
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
          >
            <Target className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Visualizing Algorithms
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Explore interactive visualizations and test algorithms with your own data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/problems" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition-colors inline-flex items-center">
                Browse Problems
                <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </Link>
              <Link href="/problems/1" className="border border-gray-600 hover:border-gray-500 px-6 py-3 rounded-lg text-gray-300 hover:text-white transition-colors inline-flex items-center">
                <Star className="inline-block mr-2 w-4 h-4" />
                Try Two Sum
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">LeetCode Visualizer</span>
          </div>
          <p className="text-gray-400 mb-4">
            Making algorithm learning visual and interactive.
          </p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}