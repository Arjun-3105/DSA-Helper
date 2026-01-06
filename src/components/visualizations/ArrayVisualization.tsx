'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Settings, Check } from 'lucide-react';

interface ArrayVisualizationProps {
  array?: number[];
  algorithm: 'two-sum' | 'max-subarray' | 'binary-search';
}

type Step = {
  description: string;
  highlighted: number[];
  comparing: number[];
};

export default function ArrayVisualization({ array: initialArray, algorithm }: ArrayVisualizationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [target, setTarget] = useState<number>(9);
  const [array, setArray] = useState<number[]>(initialArray || [2, 7, 11, 15]);
  const [result, setResult] = useState<number[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [inputArray, setInputArray] = useState<string>(array.join(', '));
  const [inputTarget, setInputTarget] = useState<string>(target.toString());

  const steps = generateSteps(array, algorithm, target);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setResult([]);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleApplyInput = () => {
    try {
      const newArray = inputArray.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
      const newTarget = parseInt(inputTarget);
      
      if (newArray.length > 0) {
        setArray(newArray);
        setTarget(newTarget);
        setCurrentStep(0);
        setIsPlaying(false);
        setResult([]);
        setShowInput(false);
      }
    } catch (error) {
      console.error('Invalid input:', error);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Array Visualization</h3>
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
            <h4 className="font-semibold mb-3">Customize Input</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Array (comma-separated numbers)
                </label>
                <input
                  type="text"
                  value={inputArray}
                  onChange={(e) => setInputArray(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="2, 7, 11, 15"
                />
              </div>
              {algorithm === 'two-sum' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Sum
                  </label>
                  <input
                    type="number"
                    value={inputTarget}
                    onChange={(e) => setInputTarget(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="9"
                  />
                </div>
              )}
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
        <p className="text-gray-300 text-sm">{currentStepData.description}</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        {array.map((value, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: currentStepData.highlighted.includes(index) ? 1.2 : 1,
              opacity: 1,
              backgroundColor: currentStepData.highlighted.includes(index) 
                ? '#3b82f6' 
                : currentStepData.comparing.includes(index)
                ? '#8b5cf6'
                : '#1f2937'
            }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-lg border-2 border-white/20 flex items-center justify-center text-white font-bold text-lg relative"
          >
            {value}
            <div className="absolute -top-6 text-xs text-gray-400">{index}</div>
          </motion.div>
        ))}
      </div>

      {algorithm === 'two-sum' && (
        <div className="text-center">
          <p className="text-gray-300 mb-2">Target: {target}</p>
          {result.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 font-semibold"
            >
              Result: [{result.join(', ')}]
            </motion.div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-white/5 rounded-lg">
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

function generateSteps(array: number[], algorithm: 'two-sum' | 'max-subarray' | 'binary-search', target: number): Step[] {
  switch (algorithm) {
    case 'two-sum':
      return generateTwoSumSteps(array, target);
    case 'max-subarray':
      return generateMaxSubarraySteps(array);
    default:
      return [] as Step[];
  }
}

function generateTwoSumSteps(array: number[], target: number): Step[] {
  const steps: Step[] = [];
  const map = new Map<number, number>();
  
  steps.push({
    description: 'Initialize hash map to store value-index pairs',
    highlighted: [],
    comparing: []
  });

  for (let i = 0; i < array.length; i++) {
    const complement = target - array[i];
    
    steps.push({
      description: `Check if complement ${complement} exists in map`,
      highlighted: [i],
      comparing: []
    });

    if (map.has(complement)) {
      const j = map.get(complement)!;
      steps.push({
        description: `Found pair! Return indices [${j}, ${i}]`,
        highlighted: [i, j],
        comparing: []
      });
      break;
    }

    steps.push({
      description: `Add current value ${array[i]} at index ${i} to map`,
      highlighted: [i],
      comparing: []
    });

    map.set(array[i], i);
  }

  return steps;
}

function generateMaxSubarraySteps(array: number[]): Step[] {
  const steps: Step[] = [];
  let maxSum = array[0];
  let currentSum = array[0];

  steps.push({
    description: 'Initialize maxSum and currentSum with first element',
    highlighted: [0],
    comparing: []
  });

  for (let i = 1; i < array.length; i++) {
    steps.push({
      description: `Compare currentSum + array[${i}] with array[${i}]`,
      highlighted: [i],
      comparing: [i - 1]
    });

    if (currentSum < 0) {
      currentSum = array[i];
      steps.push({
        description: `Reset currentSum to array[${i}], new start at index ${i}`,
        highlighted: [i],
        comparing: []
      });
    } else {
      currentSum += array[i];
      steps.push({
        description: `Add array[${i}] to currentSum: ${currentSum}`,
        highlighted: [i],
        comparing: []
      });
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      steps.push({
        description: `Update maxSum to ${maxSum}, end at index ${i}`,
        highlighted: [i],
        comparing: []
      });
    }
  }

  return steps;
}