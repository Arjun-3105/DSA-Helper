# LeetCode Visualizer

A modern, interactive web application built with Next.js that provides visualizations for LeetCode problems organized by different algorithm tags.

## Features

- **Dark Animated Homepage**: Beautiful dark theme with smooth animations and floating elements
- **Interactive Visualizations**: Step-by-step animations for different algorithm types:
  - Array algorithms (Two Sum, Maximum Subarray, etc.)
  - Tree traversals (Inorder, Preorder, Postorder, BFS)
  - Linked List operations (Reverse, Add Two Numbers, Cycle Detection)
- **Problem Organization**: Problems grouped by tags (Arrays, Trees, Linked Lists, etc.)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for smooth animations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── problems/
│   │   ├── page.tsx            # Problems list
│   │   └── [id]/
│   │       └── page.tsx        # Individual problem page
│   └── tags/
│       └── [tag]/
│           └── page.tsx        # Tag-specific problems
├── components/
│   └── visualizations/
│       ├── ArrayVisualization.tsx
│       ├── TreeVisualization.tsx
│       └── LinkedListVisualization.tsx
└── globals.css                 # Global styles and animations
```

## Available Routes

- `/` - Homepage with animated hero section
- `/problems` - List of all problems
- `/problems/[id]` - Individual problem with visualization
- `/tags/[tag]` - Problems filtered by tag

## Visualization Features

### Array Visualizations
- **Two Sum**: Interactive hash map visualization
- **Maximum Subarray**: Kadane's algorithm step-by-step
- **Binary Search**: Visual search process

### Tree Visualizations
- **Inorder Traversal**: Left → Root → Right
- **Preorder Traversal**: Root → Left → Right
- **Postorder Traversal**: Left → Right → Root
- **BFS**: Level-by-level traversal

### Linked List Visualizations
- **Reverse Linked List**: Pointer manipulation visualization
- **Add Two Numbers**: Carry propagation visualization
- **Cycle Detection**: Floyd's algorithm (Tortoise and Hare)

## Customization

### Adding New Problems
Use the data-driven model in `src/data/problems/`.

1. Create a new file for the problem, e.g. `src/data/problems/p4-<slug>.ts`.
   - Export a default object typed as `Problem` from `src/data/problems/types.ts`.
   - Required fields: `id`, `title`, `difficulty`, `difficultyColor`, `tags`, `category`, `description`, `examples` (optional), `constraints` (optional), `timeComplexity`, `spaceComplexity`, `likes` (optional), `solved` (optional), `type`, `visualizationData`.
   - The `type` must be one of `array | tree | linked-list` (see `VisualizationType`).
   - Shape `visualizationData` to match the type:
     - For `array`: `{ array: number[]; algorithm: ArrayAlgo }`
     - For `tree`: `{ tree: TreeNodeLike; algorithm: TreeAlgo }`
     - For `linked-list`: `{ list: ListNodeLike; algorithm: LinkedListAlgo }`
2. Register the problem in `src/data/problems/index.ts`:
   - Import your new problem module.
   - Add it to the `allProblems` array in the desired order.
3. Ensure the `category` matches an existing category slug in `src/data/categories.ts`.
4. Visit `/problems` and `/problems/[id]` to verify it renders. The detail page automatically picks the correct visualization based on `problem.type`.

Example skeleton:
```ts
// src/data/problems/p4-example.ts
import { Problem } from './types';

const p4: Problem = {
  id: '4',
  title: 'Example Problem',
  difficulty: 'Medium',
  difficultyColor: 'text-yellow-400',
  tags: ['Array'],
  category: 'arrays',
  description: '...problem statement...',
  examples: [
    { input: '...', output: '...', explanation: '...' }
  ],
  constraints: ['...'],
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  likes: 0,
  solved: 0,
  type: 'array',
  visualizationData: { array: [1,2,3], algorithm: 'two-sum' }
};

export default p4;
```

Then in `src/data/problems/index.ts`:
```ts
import p4 from './p4-example';
export const allProblems = [p1, p2, p3, p4];
```

### Adding New Categories
Categories are defined in `src/data/categories.ts` and power `/categories` and `/categories/[category]` routes.

1. Add a new entry to `categoriesMeta` with `{ slug, name, icon, color }`.
   - `slug` must be URL-safe (e.g., `graphs`).
   - `color` should be a Tailwind gradient suffix like `from-indigo-500 to-purple-500`.
2. Set any problem’s `category` field to this new `slug` to have it appear under the category pages and counts.
3. Navigate to `/categories` and `/categories/<slug>` to verify.

Example:
```ts
export const categoriesMeta = [
  { slug: 'arrays', name: 'Arrays', icon: '📊', color: 'from-blue-500 to-cyan-500' },
  { slug: 'linked-lists', name: 'Linked Lists', icon: '🔗', color: 'from-purple-500 to-pink-500' },
  { slug: 'trees', name: 'Trees', icon: '🌳', color: 'from-green-500 to-emerald-500' },
  { slug: 'graphs', name: 'Graphs', icon: '🕸️', color: 'from-indigo-500 to-purple-500' }
];
```

### Adding New Visualizations (Optional)
If you introduce a brand-new visualization type beyond `array`, `tree`, or `linked-list`:

1. Create a component in `src/components/visualizations/` that accepts the necessary props and renders steps.
2. Extend `VisualizationType` and the relevant `*Algo` unions in `src/data/problems/types.ts`.
3. Update `src/app/problems/[id]/page.tsx` to render your component based on `problem.type`.
4. Provide appropriate `visualizationData` in your problem objects.

### Styling
- Modify `/app/globals.css` for global styles
- Use Tailwind classes for component styling
- Add custom animations in the CSS file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by LeetCode's problem structure
- Built with modern web technologies
- Designed for educational purposes