import { Problem } from './types';
import p1 from './p1-two-sum';
import p2 from './p2-add-two-numbers';
import p3 from './p3-binary-tree-inorder';

export const allProblems: Problem[] = [p1, p2, p3];

export const problemsById: Record<string, Problem> = Object.fromEntries(
  allProblems.map((p) => [p.id, p])
);

