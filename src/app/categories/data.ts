export type Question = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

export type Category = {
  slug: string; // e.g. "arrays"
  name: string; // e.g. "Arrays"
  icon: string; // emoji for now
  color: string; // tailwind gradient class suffix, e.g. 'from-blue-500 to-cyan-500'
  questions: Question[];
};

export const categories: Category[] = [
  {
    slug: 'arrays',
    name: 'Arrays',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: '1', title: 'Two Sum', difficulty: 'Easy' }
    ]
  },
  {
    slug: 'linked-lists',
    name: 'Linked Lists',
    icon: '🔗',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: '2', title: 'Add Two Numbers', difficulty: 'Medium' }
    ]
  },
  {
    slug: 'trees',
    name: 'Trees',
    icon: '🌳',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: '3', title: 'Binary Tree Inorder Traversal', difficulty: 'Easy' }
    ]
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

