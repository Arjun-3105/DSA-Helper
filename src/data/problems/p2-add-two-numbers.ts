import { Problem } from './types';

const p2: Problem = {
  id: '2',
  title: 'Add Two Numbers',
  difficulty: 'Medium',
  difficultyColor: 'text-yellow-400',
  tags: ['Linked List', 'Math'],
  category: 'linked-lists',
  description:
    'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
  examples: [
    {
      input: 'l1 = [2,4,3], l2 = [5,6,4]',
      output: '[7,0,8]',
      explanation: '342 + 465 = 807'
    }
  ],
  constraints: [
    'The number of nodes in each linked list is in the range [1, 100].',
    '0 <= Node.val <= 9',
    'It is guaranteed that the list represents a number that does not have leading zeros.'
  ],
  timeComplexity: 'O(max(m,n))',
  spaceComplexity: 'O(max(m,n))',
  likes: 890,
  solved: 450000,
  type: 'linked-list',
  visualizationData: {
    list: { value: 2, next: { value: 4, next: { value: 3 } } },
    algorithm: 'add-two-numbers'
  }
};

export default p2;

