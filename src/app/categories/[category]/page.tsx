'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, Code, Star, Users } from 'lucide-react';
import { use } from 'react';
import { getCategoryMetaBySlug } from '@/data/categories';
import { allProblems } from '@/data/problems';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params);
  const categoryMeta = getCategoryMetaBySlug(category);
  const problems = allProblems.filter((p) => p.category === category);

  if (!categoryMeta) {
    return (
      <div className="min-h-screen gradient-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/categories" className="text-blue-400 hover:text-blue-300">
            Return to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/categories" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{categoryMeta.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {categoryMeta.name}
              </h1>
              <p className="text-xl text-gray-300">
                {problems.length} questions with interactive visualizations
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {problems.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{q.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/10 ${
                      q.difficulty === 'Easy'
                        ? 'text-green-400'
                        : q.difficulty === 'Medium'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Varies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="w-4 h-4" />
                    <span>See details</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>—</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>—</span>
                  </div>
                </div>
                <Link href={`/problems/${q.id}`} className={`bg-gradient-to-r ${categoryMeta.color} px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block`}>
                  Open
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


