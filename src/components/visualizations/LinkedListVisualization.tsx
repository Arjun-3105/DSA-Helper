'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Settings, Check } from 'lucide-react';

interface ListNode {
  value: number;
  next?: ListNode;
}

interface LinkedListVisualizationProps {
  list?: ListNode;
  algorithm: 'reverse' | 'add-two-numbers' | 'detect-cycle';
}

export default function LinkedListVisualization({ list: initialList, algorithm }: LinkedListVisualizationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visited, setVisited] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [result, setResult] = useState<number[]>([]);
  const [list, setList] = useState<ListNode>(initialList || { value: 2, next: { value: 4, next: { value: 3 } } });
  const [showInput, setShowInput] = useState(false);
  const [inputList, setInputList] = useState<string>('2,4,3');

  const steps = generateSteps(list, algorithm);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1200);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setVisited([]);
      setResult([]);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setVisited([]);
    setCurrentNode(null);
    setResult([]);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleApplyInput = () => {
    try {
      const newList = parseListFromString(inputList);
      if (newList) {
        setList(newList);
        setCurrentStep(0);
        setIsPlaying(false);
        setVisited([]);
        setCurrentNode(null);
        setResult([]);
        setShowInput(false);
      }
    } catch (error) {
      console.error('Invalid list input:', error);
    }
  };

  const parseListFromString = (str: string): ListNode | null => {
    const values = str.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
    if (values.length === 0) return null;
    
    const head: ListNode = { value: values[0] };
    let current = head;
    
    for (let i = 1; i < values.length; i++) {
      current.next = { value: values[i] };
      current = current.next;
    }
    
    return head;
  };

  const currentStepData = steps[currentStep];

  // Update state based on current step
  useEffect(() => {
    if (currentStepData) {
      setCurrentNode(currentStepData.current);
      if (currentStepData.action === 'visit') {
        setVisited(prev => [...prev, currentStepData.current!]);
      }
      if (currentStepData.result) {
        setResult(currentStepData.result);
      }
    }
  }, [currentStepData]);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Linked List Visualization</h3>
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
            <h4 className="font-semibold mb-3">Customize Linked List</h4>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Linked List (comma-separated numbers)
              </label>
              <input
                type="text"
                value={inputList}
                onChange={(e) => setInputList(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="2,4,3"
              />
              <p className="text-xs text-gray-400 mt-1">
                Example: 2,4,3 creates a linked list: 2 → 4 → 3
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

      {/* Linked List Visualization */}
      <div className="flex items-center justify-center mb-6 overflow-x-auto">
        <div className="flex items-center gap-2">
          <LinkedListNodeComponent
            list={list}
            visited={visited}
            current={currentNode}
          />
        </div>
      </div>

      {/* Result Display */}
      {result.length > 0 && (
        <div className="mb-6 text-center">
          <h4 className="font-semibold mb-2">Result:</h4>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2"
          >
            {result.map((value, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold"
              >
                {value}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

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

function LinkedListNodeComponent({ 
  list, 
  visited, 
  current 
}: { 
  list: ListNode; 
  visited: number[]; 
  current: number | null;
}) {
  const nodes = [];
  let currentList: ListNode | undefined = list;
  let index = 0;

  while (currentList) {
    const isVisited = visited.includes(currentList.value);
    const isCurrent = current === currentList.value;

    nodes.push(
      <motion.div
        key={index}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isCurrent ? 1.1 : 1,
          opacity: 1,
          backgroundColor: isCurrent 
            ? '#3b82f6' 
            : isVisited 
            ? '#10b981' 
            : '#1f2937'
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center"
      >
        <div className="w-16 h-16 rounded-lg border-2 border-white/20 flex items-center justify-center text-white font-bold text-lg relative">
          {currentList.value}
        </div>
        {currentList.next && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-8 h-0.5 bg-white/40 mx-2"
          />
        )}
      </motion.div>
    );

    currentList = currentList.next;
    index++;
  }

  return <>{nodes}</>;
}

function generateSteps(list: ListNode, algorithm: string) {
  switch (algorithm) {
    case 'reverse':
      return generateReverseSteps(list);
    case 'add-two-numbers':
      return generateAddTwoNumbersSteps(list);
    case 'detect-cycle':
      return generateDetectCycleSteps(list);
    default:
      return [];
  }
}

function generateReverseSteps(list: ListNode) {
  const steps = [];
  let prev: ListNode | undefined = undefined;
  let current: ListNode | undefined = list;
  let next: ListNode | undefined = undefined;

  steps.push({
    description: 'Initialize prev = null, current = head',
    current: current.value,
    action: 'start'
  });

  while (current) {
    next = current.next;
    
    steps.push({
      description: `Store next node: ${next?.value || 'null'}`,
      current: current.value,
      action: 'traverse'
    });

    steps.push({
      description: `Reverse link: current.next = prev (${prev?.value || 'null'})`,
      current: current.value,
      action: 'visit'
    });

    prev = current;
    current = next;

    if (current) {
      steps.push({
        description: `Move to next node: ${current.value}`,
        current: current.value,
        action: 'traverse'
      });
    }
  }

  steps.push({
    description: 'Return prev as new head',
    current: prev?.value || null,
    action: 'complete'
  });

  return steps;
}

function generateAddTwoNumbersSteps(list: ListNode) {
  const steps = [];
  let carry = 0;
  let current: ListNode | undefined = list;

  steps.push({
    description: 'Initialize carry = 0',
    current: current.value,
    action: 'start'
  });

  while (current) {
    const sum = current.value + carry;
    const digit = sum % 10;
    carry = Math.floor(sum / 10);

    steps.push({
      description: `Calculate sum: ${current.value} + ${carry} = ${sum}`,
      current: current.value,
      action: 'visit'
    });

    steps.push({
      description: `Update digit: ${digit}, carry: ${carry}`,
      current: current.value,
      action: 'visit'
    });

    current = current.next;
    if (current) {
      steps.push({
        description: `Move to next node: ${current.value}`,
        current: current.value,
        action: 'traverse'
      });
    }
  }

  if (carry > 0) {
    steps.push({
      description: `Add final carry: ${carry}`,
      current: null,
      action: 'complete'
    });
  }

  return steps;
}

function generateDetectCycleSteps(list: ListNode) {
  const steps = [];
  let slow: ListNode | undefined = list;
  let fast: ListNode | undefined = list;

  steps.push({
    description: 'Initialize slow and fast pointers at head',
    current: list.value,
    action: 'start'
  });

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;

    steps.push({
      description: `Move slow pointer to ${slow?.value || 'null'}, fast to ${fast?.value || 'null'}`,
      current: slow?.value || null,
      action: 'traverse'
    });

    if (slow === fast) {
      steps.push({
        description: 'Cycle detected! Slow and fast pointers met',
        current: slow?.value || null,
        action: 'visit'
      });
      break;
    }
  }

  if (!fast || !fast.next) {
    steps.push({
      description: 'No cycle detected - reached end of list',
      current: null,
      action: 'complete'
    });
  }

  return steps;
}