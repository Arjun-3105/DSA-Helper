export type CategoryMeta = {
  slug: string; // e.g. 'arrays'
  name: string; // e.g. 'Arrays'
  icon: string; // emoji or icon code
  color: string; // tailwind gradient classes suffix, e.g. 'from-blue-500 to-cyan-500'
};

export const categoriesMeta: CategoryMeta[] = [
  { slug: 'arrays', name: 'Arrays', icon: '📊', color: 'from-blue-500 to-cyan-500' },
  { slug: 'linked-lists', name: 'Linked Lists', icon: '🔗', color: 'from-purple-500 to-pink-500' },
  { slug: 'trees', name: 'Trees', icon: '🌳', color: 'from-green-500 to-emerald-500' }
];

export function getCategoryMetaBySlug(slug: string) {
  return categoriesMeta.find((c) => c.slug === slug);
}

