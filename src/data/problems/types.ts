export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type VisualizationType = 'array' | 'tree' | 'linked-list';

export type ArrayAlgo = 'two-sum';
export type TreeAlgo = 'inorder';
export type LinkedListAlgo = 'add-two-numbers';

export type VisualizationData = 
  | { array: number[]; algorithm: ArrayAlgo }
  | { tree: TreeNodeLike; algorithm: TreeAlgo }
  | { list: ListNodeLike; algorithm: LinkedListAlgo };

export interface TreeNodeLike {
  value: number;
  left?: TreeNodeLike;
  right?: TreeNodeLike;
}

export interface ListNodeLike {
  value: number;
  next?: ListNodeLike;
}

export type Problem = {
  id: string; // string for URL param compatibility
  title: string;
  difficulty: Difficulty;
  difficultyColor: string;
  tags: string[];
  description: string;
  category: 'arrays' | 'linked-lists' | 'trees';
  examples?: { input: string; output: string; explanation: string }[];
  constraints?: string[];
  timeComplexity: string;
  spaceComplexity: string;
  likes?: number;
  solved?: number;
  type: VisualizationType;
  visualizationData: VisualizationData;
};

