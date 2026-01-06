'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Code, Clock, Users, Star, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ArrayVisualization from '@/components/visualizations/ArrayVisualization';
import TreeVisualization from '@/components/visualizations/TreeVisualization';
import LinkedListVisualization from '@/components/visualizations/LinkedListVisualization';
import { problemsById } from '@/data/problems';

interface ProblemPageProps {
  params: {
    id: string;
  };
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const problem = problemsById[params.id];
  const [activeTab, setActiveTab] = useState<'description' | 'visualization'>('description');

  if (!problem) {
    return (
      <div className="min-h-screen gradient-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Problem Not Found</h1>
          <Link href="/problems" className="text-blue-400 hover:text-blue-300">
            Return to Problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/problems" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Problems
          </Link>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{problem.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${problem.difficultyColor} bg-white/10`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{problem.timeComplexity}</span>
              </div>
              <div className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                <span>{problem.spaceComplexity}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{problem.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{problem.solved.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'description'
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('visualization')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'visualization'
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Play className="inline-block w-4 h-4 mr-2" />
            Visualization
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'description' ? (
            <div className="space-y-8">
              {/* Problem Description */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
                <p className="text-gray-300 leading-relaxed">{problem.description}</p>
              </div>

              {/* Examples */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Examples</h2>
                {problem.examples.map((example, index) => (
                  <div key={index} className="mb-4 p-4 bg-white/5 rounded-lg">
                    <div className="mb-2">
                      <span className="font-semibold text-blue-400">Input: </span>
                      <code className="text-gray-300">{example.input}</code>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold text-green-400">Output: </span>
                      <code className="text-gray-300">{example.output}</code>
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-400">Explanation: </span>
                      <span className="text-gray-300">{example.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Constraints</h2>
                <ul className="space-y-2">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {problem.type === 'array' && (
                <ArrayVisualization
                  array={problem.visualizationData.array}
                  algorithm={problem.visualizationData.algorithm}
                />
              )}
              {problem.type === 'tree' && (
                <TreeVisualization
                  tree={problem.visualizationData.tree}
                  algorithm={problem.visualizationData.algorithm}
                />
              )}
              {problem.type === 'linked-list' && (
                <LinkedListVisualization
                  list={problem.visualizationData.list}
                  algorithm={problem.visualizationData.algorithm}
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
