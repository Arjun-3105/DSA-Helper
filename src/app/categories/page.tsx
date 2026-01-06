'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { categoriesMeta } from '@/data/categories';
import { allProblems } from '@/data/problems';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen gradient-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            Categories
          </h1>
          <p className="text-xl text-gray-300">
            Browse problem groups by category
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoriesMeta.map((cat, index) => {
            const count = allProblems.filter((p) => p.category === cat.slug).length;
            return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
    </div>
  );
}


