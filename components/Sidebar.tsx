'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import CodeBlock from './CodeBlock';

interface PlanStep {
  type: string;
  params: any;
}

export default function Sidebar() {
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [plan, setPlan] = useState<PlanStep[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Animate sidebar on mount
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      gsap.fromTo(
        '.sidebar',
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }

    // Simulate transcript updates (replace with actual WebSocket or API)
    const interval = setInterval(() => {
      setTranscripts((prev) => [...prev, 'Sample transcript...']);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRunPlan = () => {
    setToastMessage('Plan executed!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancelPlan = () => {
    setPlan([]);
    setToastMessage('Plan cancelled!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="sidebar w-80 bg-gray-800/80 backdrop-blur-md p-4 h-full rounded-r-2xl shadow-lg md:block hidden">
      <h2 className="text-xl font-bold mb-4">Jarvis Assistant</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Transcripts</h3>
        <div className="h-40 overflow-y-auto bg-gray-900/50 p-2 rounded-lg" role="log" aria-live="polite">
          {transcripts.map((text, index) => (
            <p key={index} className="text-sm">{text}</p>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Plan Preview</h3>
        <div className="bg-gray-900/50 p-2 rounded-lg">
          {plan.length ? (
            plan.map((step, index) => (
              <p key={index} className="text-sm">{`${step.type}: ${JSON.stringify(step.params)}`}</p>
            ))
          ) : (
            <p className="text-sm text-gray-400">No plan available</p>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleRunPlan}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            aria-label="Run plan"
          >
            Run
          </button>
          <button
            onClick={handleCancelPlan}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            aria-label="Cancel plan"
          >
            Cancel
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Code Blocks</h3>
        <CodeBlock code="console.log('Hello, Jarvis!');" language="javascript" />
      </div>
      {showToast && (
        <div
          className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
          role="alert"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}