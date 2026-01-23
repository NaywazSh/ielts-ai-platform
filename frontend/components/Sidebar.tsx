"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenTool, Mic, BookOpen, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PenTool, label: "Writing Simulator", href: "/writing" },
  { icon: Mic, label: "Speaking Coach", href: "/speaking" },
  { icon: BookOpen, label: "Reading Tests", href: "/reading" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50 text-white">
      <div className="p-6 flex items-center gap-2 border-b border-slate-800/50">
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-lg"></div>
        <h1 className="text-xl font-bold tracking-tight">IELTS<span className="text-indigo-400">Master</span></h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "text-white" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                {isActive && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-indigo-600/20 border border-indigo-500/30 rounded-xl" />
                )}
                <item.icon size={20} className={isActive ? "text-indigo-400" : "group-hover:text-indigo-400 transition-colors"} />
                <span className="relative font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-red-900/10 hover:text-red-400 rounded-xl transition-all">
           <LogOut size={20} />
           <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
