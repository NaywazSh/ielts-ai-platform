import { TrendingUp, Target, Clock, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 text-white">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Scholar</h1>
          <p className="text-slate-400 mt-2">Your exam is in 14 days. Let's make today count.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg font-medium transition">
          Take Mock Exam
        </button>
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
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Writing Performance History</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {/* Fake Chart Bars for UI Demo */}
            {[6.0, 6.5, 6.0, 7.0, 6.5, 7.5, 7.0].map((score, i) => (
              <div key={i} className="w-full bg-slate-800 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 w-full bg-indigo-600 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-400"
                  style={{ height: `${(score / 9) * 100}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black px-2 py-1 rounded text-xs transition-opacity">
                  {score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weakness Analysis */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Focus Areas</h3>
          <div className="space-y-4">
            <SkillBar label="Lexical Resource" percent={65} />
            <SkillBar label="Coherence" percent={80} />
            <SkillBar label="Task Response" percent={55} color="bg-red-500" />
          </div>
          <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-xl">
            <p className="text-sm text-indigo-200">💡 Tip: Work on your connecting words to improve Coherence.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for this page
function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:border-slate-700 transition">
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

function SkillBar({ label, percent, color = "bg-indigo-500" }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">{percent}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
