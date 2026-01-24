"use client";
import React, { useState } from 'react';
import { Headphones, Mic, CheckCircle } from "lucide-react";

export default function PlacementTest() {
  const [step, setStep] = useState(1); // 1: Listening, 2: Speaking, 3: Result

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        
        {/* Step 1: Listening */}
        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="bg-indigo-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-indigo-400">
              <Headphones size={32} />
            </div>
            <h2 className="text-2xl font-bold">Part 1: Listening</h2>
            <p className="text-slate-400">Listen to the short clip and answer: What is the speaker's main goal?</p>
            <div className="bg-slate-800 p-4 rounded-xl mb-4">🔊 [Audio Placeholder]</div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-500 transition"
            >
              Next: Speaking Section
            </button>
          </div>
        )}

        {/* Step 2: Speaking */}
        {step === 2 && (
          <div className="space-y-6 text-center">
            <div className="bg-rose-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-rose-400">
              <Mic size={32} />
            </div>
            <h2 className="text-2xl font-bold">Part 2: Speaking</h2>
            <p className="text-slate-400">"Describe your favorite hobby for 60 seconds."</p>
            <button className="bg-rose-600 px-8 py-3 rounded-full font-bold animate-pulse">
              Click to Record
            </button>
            <button 
              onClick={() => setStep(3)}
              className="block w-full mt-4 text-slate-500 underline"
            >
              Finish Test
            </button>
          </div>
        )}

        {/* Step 3: Result & Suggestion */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold">Your Results</h2>
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-emerald-500/20">
              <p className="text-emerald-400 font-medium mb-2">Suggested Path:</p>
              <h3 className="text-3xl font-bold">IELTS Intermediate (Band 6.5)</h3>
            </div>
            <p className="text-slate-400">Based on your fluency and listening accuracy, we recommend the Intensive 4-week program.</p>
            <button className="w-full bg-indigo-600 py-3 rounded-xl font-bold">
              Enroll in Suggested Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
