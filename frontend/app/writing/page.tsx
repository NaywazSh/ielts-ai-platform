"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, BarChart2, BookOpen } from 'lucide-react';

export default function WritingTest() {
  const [essay, setEssay] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const question = "Some people believe that university education should be free for everyone. To what extent do you agree or disagree?";

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; const res = await fetch(`${apiUrl}/api/v1/evaluate/writing`, {        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer: essay }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Question & Input */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-brand-500 mb-2 flex items-center gap-2">
              <BookOpen size={20}/> Writing Task 2
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">{question}</p>
          </div>

          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            className="w-full h-96 bg-slate-800/30 border border-slate-700 rounded-2xl p-6 text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none resize-none shadow-inner text-lg"
            placeholder="Start typing your essay here..."
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || essay.length < 50}
            className="w-full py-4 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-lg shadow-brand-900/50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <CheckCircle />}
            {loading ? "AI is Analyzing..." : "Get Instant AI Score"}
          </button>
        </motion.div>

        {/* Right Side: AI Analysis Result */}
        <div className="relative">
          {!result && !loading && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-600">
              <p className="text-center">Submit your essay to see <br/> detailed AI breakdown.</p>
            </div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-8"
            >
              {/* Score Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-6">
                <div>
                  <h3 className="text-slate-400 font-medium">Predicted Band Score</h3>
                  <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                    {result.band_score}
                  </h1>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl">
                  <BarChart2 className="text-brand-500" size={32} />
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <ScoreCard label="Vocabulary" score={result.vocabulary_score} />
                <ScoreCard label="Coherence" score={result.coherence_score} />
              </div>

              {/* Feedback Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Examiner Feedback</h4>
                <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  {result.feedback}
                </p>
              </div>

              {/* Corrections */}
              <div className="space-y-2">
                 <h4 className="text-lg font-semibold text-white">Key Improvements</h4>
                 <ul className="space-y-2">
                    {result.corrections.slice(0, 3).map((fix: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-red-300 bg-red-900/20 p-3 rounded-lg">
                        <span className="mt-1">⚠️</span> {fix}
                      </li>
                    ))}
                 </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple Helper Component
function ScoreCard({ label, score }: { label: string, score: number }) {
  return (
    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
      <div className="text-slate-400 text-sm">{label}</div>
      <div className="text-2xl font-bold text-white">{score}</div>
      <div className="w-full bg-slate-700 h-1.5 mt-2 rounded-full overflow-hidden">
        <div className="bg-brand-500 h-full rounded-full" style={{ width: `${(score/9)*100}%` }}></div>
      </div>
    </div>
  );
}
