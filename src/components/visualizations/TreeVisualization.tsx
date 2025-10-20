'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Settings, Check } from 'lucide-react';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

interface TreeVisualizationProps {
  tree?: TreeNode;
  algorithm: 'inorder' | 'preorder' | 'postorder' | 'bfs';
}

export default function TreeVisualization({ tree: initialTree, algorithm }: TreeVisualizationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visited, setVisited] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [traversal, setTraversal] = useState<number[]>([]);
  const [tree, setTree] = useState<TreeNode>(initialTree || {
    value: 1,
    right: {
      value: 2,
      left: { value: 3 }
    }
  });
  const [showInput, setShowInput] = useState(false);
  const [inputTree, setInputTree] = useState<string>('1,null,2,3');

  const steps = generateTraversalSteps(tree, algorithm);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setVisited([]);
      setTraversal([]);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setVisited([]);
    setCurrentNode(null);
    setTraversal([]);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleApplyInput = () => {
    try {
      const newTree = parseTreeFromString(inputTree);
      if (newTree) {
        setTree(newTree);
        setCurrentStep(0);
        setIsPlaying(false);
        setVisited([]);
        setCurrentNode(null);
        setTraversal([]);
        setShowInput(false);
      }
    } catch (error) {
      console.error('Invalid tree input:', error);
    }
  };

  const parseTreeFromString = (str: string): TreeNode | null => {
    const values = str.split(',').map(v => v.trim() === 'null' ? null : parseInt(v.trim()));
    if (values.length === 0 || values[0] === null) return null;
    
    const root: TreeNode = { value: values[0]! };
    const queue: TreeNode[] = [root];
    let i = 1;
    
    while (queue.length > 0 && i < values.length) {
      const node = queue.shift()!;
      
      if (i < values.length && values[i] !== null) {
        node.left = { value: values[i]! };
        queue.push(node.left);
      }
      i++;
      
      if (i < values.length && values[i] !== null) {
        node.right = { value: values[i]! };
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  };

  const currentStepData = steps[currentStep];

  // Update state based on current step
  useEffect(() => {
    if (currentStepData) {
      setCurrentNode(currentStepData.current);
      if (currentStepData.action === 'visit') {
        setVisited(prev => [...prev, currentStepData.current!]);
        setTraversal(prev => [...prev, currentStepData.current!]);
      }
    }
  }, [currentStepData]);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Tree Traversal Visualization</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInput(!showInput)}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            title="Customize Input"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePlay}
            className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={handleStepForward}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Input Panel */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <h4 className="font-semibold mb-3">Customize Tree</h4>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tree (level-order, comma-separated, use 'null' for empty nodes)
              </label>
              <input
                type="text"
                value={inputTree}
                onChange={(e) => setInputTree(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="1,null,2,3"
              />
              <p className="text-xs text-gray-400 mt-1">
                Example: 1,null,2,3 represents a tree with root=1, no left child, right child=2 with left child=3
              </p>
            </div>
            <button
              onClick={handleApplyInput}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center"
            >
              <Check className="w-4 h-4 mr-2" />
              Apply Changes
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-gray-400">Step {currentStep + 1} of {steps.length}</span>
          <div className="flex-1 bg-white/10 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-gray-300 text-sm">{currentStepData?.description}</p>
      </div>

      {/* Tree Visualization */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <TreeNodeComponent
            node={tree}
            visited={visited}
            current={currentNode}
            level={0}
          />
        </div>
      </div>

      {/* Traversal Result */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Traversal Order:</h4>
        <div className="flex gap-2 flex-wrap">
          {traversal.map((value, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded-lg">
        <h4 className="font-semibold mb-2">Algorithm Steps:</h4>
        <div className="space-y-1">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-sm p-2 rounded ${
                index === currentStep 
                  ? 'bg-blue-500/20 text-blue-300' 
                  : index < currentStep 
                  ? 'text-gray-400' 
                  : 'text-gray-500'
              }`}
            >
              {step.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TreeNodeComponent({ 
  node, 
  visited, 
  current, 
  level 
}: { 
  node: TreeNode; 
  visited: number[]; 
  current: number | null; 
  level: number;
}) {
  const isVisited = visited.includes(node.value);
  const isCurrent = current === node.value;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isCurrent ? 1.2 : 1,
          opacity: 1,
          backgroundColor: isCurrent 
            ? '#3b82f6' 
            : isVisited 
            ? '#10b981' 
            : '#1f2937'
        }}
        transition={{ duration: 0.3 }}
        className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-bold text-sm relative"
      >
        {node.value}
      </motion.div>
      
      {(node.left || node.right) && (
        <div className="flex gap-8 mt-4">
          {node.left && (
            <div className="flex flex-col items-center">
              <div className="w-px h-4 bg-white/20"></div>
              <TreeNodeComponent
                node={node.left}
                visited={visited}
                current={current}
                level={level + 1}
              />
            </div>
          )}
          {node.right && (
            <div className="flex flex-col items-center">
              <div className="w-px h-4 bg-white/20"></div>
              <TreeNodeComponent
                node={node.right}
                visited={visited}
                current={current}
                level={level + 1}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function generateTraversalSteps(tree: TreeNode, algorithm: string) {
  const steps = [];
  
  switch (algorithm) {
    case 'inorder':
      return generateInorderSteps(tree);
    case 'preorder':
      return generatePreorderSteps(tree);
    case 'postorder':
      return generatePostorderSteps(tree);
    case 'bfs':
      return generateBFSSteps(tree);
    default:
      return [];
  }
}

function generateInorderSteps(tree: TreeNode) {
  const steps = [];
  const stack: TreeNode[] = [];
  let current: TreeNode | undefined = tree;

  steps.push({
    description: 'Start inorder traversal: Left → Root → Right',
    current: null,
    action: 'start'
  });

  while (current || stack.length > 0) {
    while (current) {
      steps.push({
        description: `Go to left child of ${current.value}`,
        current: current.value,
        action: 'traverse'
      });
      stack.push(current);
      current = current.left;
    }

    current = stack.pop()!;
    steps.push({
      description: `Visit node ${current.value}`,
      current: current.value,
      action: 'visit'
    });

    current = current.right;
  }

  return steps;
}

function generatePreorderSteps(tree: TreeNode) {
  const steps = [];
  const stack: TreeNode[] = [tree];

  steps.push({
    description: 'Start preorder traversal: Root → Left → Right',
    current: null,
    action: 'start'
  });

  while (stack.length > 0) {
    const current = stack.pop()!;
    
    steps.push({
      description: `Visit node ${current.value}`,
      current: current.value,
      action: 'visit'
    });

    if (current.right) {
      steps.push({
        description: `Add right child ${current.right.value} to stack`,
        current: current.value,
        action: 'traverse'
      });
      stack.push(current.right);
    }

    if (current.left) {
      steps.push({
        description: `Add left child ${current.left.value} to stack`,
        current: current.value,
        action: 'traverse'
      });
      stack.push(current.left);
    }
  }

  return steps;
}

function generatePostorderSteps(tree: TreeNode) {
  const steps = [];
  const stack: TreeNode[] = [tree];
  const visited = new Set<number>();

  steps.push({
    description: 'Start postorder traversal: Left → Right → Root',
    current: null,
    action: 'start'
  });

  while (stack.length > 0) {
    const current = stack[stack.length - 1];

    if (visited.has(current.value)) {
      stack.pop();
      steps.push({
        description: `Visit node ${current.value}`,
        current: current.value,
        action: 'visit'
      });
    } else {
      visited.add(current.value);
      
      if (current.right) {
        steps.push({
          description: `Add right child ${current.right.value} to stack`,
          current: current.value,
          action: 'traverse'
        });
        stack.push(current.right);
      }

      if (current.left) {
        steps.push({
          description: `Add left child ${current.left.value} to stack`,
          current: current.value,
          action: 'traverse'
        });
        stack.push(current.left);
      }
    }
  }

  return steps;
}

function generateBFSSteps(tree: TreeNode) {
  const steps = [];
  const queue: TreeNode[] = [tree];

  steps.push({
    description: 'Start BFS traversal: Level by level',
    current: null,
    action: 'start'
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    steps.push({
      description: `Visit node ${current.value}`,
      current: current.value,
      action: 'visit'
    });

    if (current.left) {
      steps.push({
        description: `Add left child ${current.left.value} to queue`,
        current: current.value,
        action: 'traverse'
      });
      queue.push(current.left);
    }

    if (current.right) {
      steps.push({
        description: `Add right child ${current.right.value} to queue`,
        current: current.value,
        action: 'traverse'
      });
      queue.push(current.right);
    }
  }

  return steps;
}