import { Problem } from './types';

const p3: Problem = {
  id: '3',
  title: 'Binary Tree Inorder Traversal',
  difficulty: 'Easy',
  difficultyColor: 'text-green-400',
  tags: ['Stack', 'Tree', 'Depth-First Search'],
  category: 'trees',
  description:
    "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
  examples: [
    {
      input: 'root = [1,null,2,3]',
      output: '[1,3,2]',
      explanation: 'Inorder: Left -> Root -> Right'
    }
  ],
  constraints: [
    'The number of nodes in the tree is in the range [0, 100].',
    '-100 <= Node.val <= 100'
  ],
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  likes: 750,
  solved: 680000,
  type: 'tree',
  visualizationData: {
    tree: {
      value: 1,
      right: {
        value: 2,
        left: { value: 3 }
      }
    },
    algorithm: 'inorder'
  }
};

export default p3;

