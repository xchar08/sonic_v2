'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [output, setOutput] = useState('');

  const runCode = async () => {
    try {
      // Simulate code execution (replace with actual execution via IPC or Cerebras)
      setOutput('Code executed successfully!');
    } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <pre className="text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={runCode}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
        aria-label="Run code"
      >
        Run Code
      </button>
      {output && <p className="text-sm mt-2">{output}</p>}
    </div>
  );
}