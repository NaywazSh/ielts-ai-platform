'use client'; // CRITICAL: This allows the use of hooks like useState

import { useState, useEffect } from 'react';

export default function ReadingPage() {
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uses the Environment Variable we set up earlier
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    fetch(`${API_URL}/reading/test_1`)
      .then((res) => res.json())
      .then((data) => {
        setTest(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reading test:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-xl font-semibold">Waking up the AI Master...</p>
      </div>
    </div>
  );

  if (!test) return <div className="p-10 text-white">Error loading test. Please check backend.</div>;

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950">
      {/* LEFT SIDE: Passage (Scrollable) */}
      <div className="w-1/2 overflow-y-auto p-12 border-r border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{test.title}</h1>
        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
          {test.passage}
        </div>
      </div>

      {/* RIGHT SIDE: Questions (Sticky/Fixed) */}
      <div className="w-1/2 p-12 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Questions</h2>
        {test.questions.map((q: any) => (
          <div key={q.id} className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
            <p className="font-medium text-slate-900 dark:text-slate-100 mb-3">{q.id}. {q.text}</p>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your answer..."
            />
          </div>
        ))}
        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
          Submit All Answers
        </button>
      </div>
    </div>
  );
}