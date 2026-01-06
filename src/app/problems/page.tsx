'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Code, Clock, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { allProblems } from '@/data/problems';

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
          {allProblems.map((problem, index) => (
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
