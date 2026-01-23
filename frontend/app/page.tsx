"use client";
import React, { useState } from 'react';
import { Loader2, Zap, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WritingTest() {
  const [essay, setEssay] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const question = "Some people believe that university education should be free for everyone. To what extent do you agree or disagree?";

  // CHANGE THIS TO YOUR VERCEL/RENDER URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://ielts-ai-platform-xzsz.onrender.com";

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/evaluate/writing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer: essay }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6 text-white">
      
      {/* LEFT COLUMN: Question & Info */}
      <div className="w-1/3 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 text-indigo-400 mb-4 font-bold uppercase text-sm tracking-wider">
            <Clock size={16} /> 40 Minutes Recommended
          </div>
          <h2 className="text-xl font-semibold mb-6 leading-relaxed text-white">
            {question}
          </h2>
          
          <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl">
             <h4 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2">
               <Zap size={16} /> AI Tips
             </h4>
             <ul className="text-sm text-indigo-200/80 space-y-2 list-disc pl-4">
               <li>Ensure you have a clear thesis statement.</li>
               <li>Use at least 3 separate paragraphs.</li>
               <li>Aim for 250+ words.</li>
             </ul>
          </div>
        </div>

        {/* Result Card (Appears after submission) */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-2xl"
          >
             <div className="flex justify-between items-center mb-4">
                <span className="text-emerald-400 font-medium">Overall Score</span>
                <span className="text-3xl font-bold text-white">{result.band_score}</span>
             </div>
             <p className="text-sm text-slate-300 mb-4">{result.feedback}</p>
             <div className="space-y-2">
               {result.corrections?.slice(0, 2).map((fix: string, i: number) => (
                 <div key={i} className="text-xs bg-black/30 p-2 rounded text-red-300 border border-red-500/20">
                   {fix}
                 </div>
               ))}
             </div>
          </motion.div>
        )}
      </div>

      {/* RIGHT COLUMN: Editor */}
      <div className="w-2/3 flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-1 flex-1 relative shadow-2xl">
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            className="w-full h-full bg-transparent p-8 text-slate-200 resize-none outline-none font-mono text-lg leading-relaxed"
            placeholder="Start typing your essay here..."
          />
          
          {/* Word Count Indicator */}
          <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            {essay.split(/\s+/).filter(w => w.length > 0).length} Words
          </div>
        </div>

        <button
            onClick={handleAnalyze}
            disabled={loading || essay.length < 20}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-3 shadow-lg shadow-indigo-900/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Submit for AI Evaluation"}
        </button>
      </div>
    </div>
  );
}
