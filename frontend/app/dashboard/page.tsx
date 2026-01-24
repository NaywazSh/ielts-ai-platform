import { TrendingUp, Target, Clock, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 text-white">
 import Link from "next/link"; // 1. Make sure this import is at the very top!
import { TrendingUp, Target, Clock, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 text-white">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Welcome back, Scholar
          </h1>
          <p className="text-slate-400 mt-2">Your exam is coming up. Let's make today count.</p>
        </div>
        
        <div className="flex gap-3">
          {/* 2. Wrap the button in a Link component */}
          <Link href="/placement-test">
            <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer">
              Take Placement Test (10 min)
            </button>
          </Link>

          <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg font-medium transition shadow-lg shadow-indigo-900/20">
            Take Mock Exam
          </button>
        </div>
      </div>
      <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-2 rounded-lg font-medium transition">
        Take Placement Test
      </button>
    </Link>
    <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg font-medium transition shadow-lg shadow-indigo-900/20">
      Take Mock Exam
    </button>
  </div>
</div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Predicted Band" value="7.5" icon={Target} color="text-emerald-400" bg="bg-emerald-400/10" />
        <StatCard title="Questions Done" value="128" icon={TrendingUp} color="text-indigo-400" bg="bg-indigo-400/10" />
        <StatCard title="Study Hours" value="12.5" icon={Clock} color="text-orange-400" bg="bg-orange-400/10" />
        <StatCard title="Current Streak" value="5 Days" icon={Award} color="text-pink-400" bg="bg-pink-400/10" />
      </div>

      {/* Recent Activity & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6">Performance History</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[6.0, 6.5, 6.0, 7.0, 6.5, 7.5, 7.0].map((score, i) => (
              <div key={i} className="w-full bg-slate-800 rounded-t-lg relative group h-full flex items-end">
                <div 
                  className="w-full bg-indigo-600 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-400"
                  style={{ height: `${(score / 9) * 100}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-slate-500 text-xs mt-4">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Weakness Analysis */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Focus Areas</h3>
          <div className="space-y-6">
            <SkillBar label="Lexical Resource" percent={65} color="bg-indigo-500" />
            <SkillBar label="Coherence" percent={80} color="bg-emerald-500" />
            <SkillBar label="Task Response" percent={55} color="bg-rose-500" />
            <SkillBar label="Grammar" percent={70} color="bg-amber-500" />
          </div>
          <div className="mt-8 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-xl">
            <p className="text-sm text-indigo-200">💡 Tip: Use more complex sentence structures to boost Grammar score.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:border-slate-700 transition duration-300">
      <div className={`p-4 rounded-xl ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-slate-400 text-sm font-medium">{title}</h4>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}

function SkillBar({ label, percent, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">{percent}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
