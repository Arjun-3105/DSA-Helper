import { Problem } from './types';

const p1: Problem = {
  id: '1',
  title: 'Two Sum',
  difficulty: 'Easy',
  difficultyColor: 'text-green-400',
  tags: ['Array', 'Hash Table'],
  category: 'arrays',
  description:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    }
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.'
  ],
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  likes: 1250,
  solved: 850000,
  type: 'array',
  visualizationData: {
    array: [2, 7, 11, 15],
    algorithm: 'two-sum'
  }
};

export default p1;

