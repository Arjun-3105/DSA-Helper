'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Code, Clock, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

interface TagProblem {
  id: number;
  title: string;
  difficulty: string;
  difficultyColor: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  likes: number;
  solved: number;
}

const tagData: Record<string, { name: string; icon: string; color: string; problems: TagProblem[] }> = {
  'arrays': {
    name: 'Arrays',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    problems: [
      {
        id: 1,
        title: 'Two Sum',
        difficulty: 'Easy',
        difficultyColor: 'text-green-400',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        likes: 1250,
        solved: 850000
      },
      {
        id: 2,
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        difficultyColor: 'text-green-400',
        description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        likes: 2100,
        solved: 720000
      },
      {
        id: 3,
        title: 'Maximum Subarray',
        difficulty: 'Easy',
        difficultyColor: 'text-green-400',
        description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        likes: 1800,
        solved: 520000
      }
    ]
  },
  'linked-lists': {
    name: 'Linked Lists',
    icon: '🔗',
    color: 'from-purple-500 to-pink-500',
    problems: [
      {
        id: 4,
        title: 'Add Two Numbers',
        difficulty: 'Medium',
        difficultyColor: 'text-yellow-400',
        description: 'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
        timeComplexity: 'O(max(m,n))',
        spaceComplexity: 'O(max(m,n))',
        likes: 890,
        solved: 450000
      },
      {
        id: 5,
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        difficultyColor: 'text-green-400',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        likes: 1500,
        solved: 680000
      }
    ]
  },
  'trees': {
    name: 'Trees',
    icon: '🌳',
    color: 'from-green-500 to-emerald-500',
    problems: [
      {
        id: 6,
        title: 'Binary Tree Inorder Traversal',
        difficulty: 'Easy',
        difficultyColor: 'text-green-400',
        description: 'Given the root of a binary tree, return the inorder traversal of its nodes&apos; values.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        likes: 750,
        solved: 680000
      },
      {
        id: 7,
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        difficultyColor: 'text-green-400',
        description: 'Given the root of a binary tree, return its maximum depth.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        likes: 1200,
        solved: 590000
      }
    ]
  }
};

export default function TagPage({ params }: TagPageProps) {
  const { tag } = use(params);
  const data = tagData[tag];

  if (!data) {
    return (
      <div className="min-h-screen gradient-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tag Not Found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
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
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{data.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {data.name} Problems
              </h1>
              <p className="text-xl text-gray-300">
                {data.problems.length} problems with interactive visualizations
              </p>
            </div>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid gap-6">
          {data.problems.map((problem, index) => (
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
                <Link href={`/problems/${problem.id}`} className={`bg-gradient-to-r ${data.color} px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block`}>
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
