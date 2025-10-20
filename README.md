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
1. Add problem data to the `problems` object in `/app/problems/[id]/page.tsx`
2. Create visualization data with appropriate algorithm type
3. Update the visualization component if needed

### Adding New Visualizations
1. Create a new component in `/components/visualizations/`
2. Follow the existing pattern with step generation
3. Add the new visualization type to problem pages

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