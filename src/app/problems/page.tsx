'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Code, Clock, Users, Star } from 'lucide-react';
import Link from 'next/link';

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    difficultyColor: 'text-green-400',
    tags: ['Array', 'Hash Table'],
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    likes: 1250,
    solved: 850000
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    difficultyColor: 'text-yellow-400',
    tags: ['Linked List', 'Math'],
    description: 'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
    timeComplexity: 'O(max(m,n))',
    spaceComplexity: 'O(max(m,n))',
    likes: 890,
    solved: 450000
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    difficultyColor: 'text-yellow-400',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m,n))',
    likes: 2100,
    solved: 320000
  },
  {
    id: 4,
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    difficultyColor: 'text-green-400',
    tags: ['Stack', 'Tree', 'Depth-First Search'],
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    likes: 750,
    solved: 680000
  },
  {
    id: 5,
    title: 'Maximum Subarray',
    difficulty: 'Easy',
    difficultyColor: 'text-green-400',
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    likes: 1800,
    solved: 520000
  },
  {
    id: 6,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    difficultyColor: 'text-green-400',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    likes: 950,
    solved: 410000
  }
];

export default function ProblemsPage() {
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
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Problems
          </h1>
          <p className="text-xl text-gray-300">
            Browse and practice with interactive visualizations
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{problem.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${problem.difficultyColor} bg-white/10`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{problem.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {problem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
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
                <Link href={`/problems/${problem.id}`} className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block">
                  Visualize
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
