import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
      
      <div className="bg-slate-800/50 p-3 rounded-full mb-6 border border-slate-700">
         <Sparkles className="text-yellow-400 w-6 h-6" />
      </div>

      <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6 text-center">
        IELTS AI Master
      </h1>
      
      <p className="text-xl text-slate-400 mb-10 text-center max-w-lg leading-relaxed">
        Achieve your dream Band Score with instant, AI-powered feedback on your Writing & Speaking.
      </p>
      
      <Link 
        href="/writing" 
        className="px-8 py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:scale-105 transform transition-all rounded-full font-bold text-lg flex items-center gap-3 shadow-lg shadow-indigo-900/50"
      >
        Start Writing Test <ArrowRight className="w-5 h-5" />
      </Link>

      <div className="mt-12 text-slate-500 text-sm">
        Powered by OpenAI GPT-4 & Google Gemini
      </div>
    </div>
  );
}
