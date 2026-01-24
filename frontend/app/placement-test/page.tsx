"use client";
import React from 'react';
import { Calendar, Video, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoogleMeetPlacement() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-bold italic">Official Placement Test</h1>
          <p className="text-slate-400 text-sm">Conducted via Google Meet</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Video className="text-indigo-400" /> Test Instructions
            </h2>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex gap-3">
                <span className="bg-indigo-500/20 text-indigo-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0">1</span>
                Select an available time slot from the calendar.
              </li>
              <li className="flex gap-3">
                <span className="bg-indigo-500/20 text-indigo-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0">2</span>
                You will receive a Google Meet link in your email.
              </li>
              <li className="flex gap-3">
                <span className="bg-indigo-500/20 text-indigo-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0">3</span>
                Join the call on time. The examiner will grade you live.
              </li>
            </ul>
          </div>
        </div>

        {/* The Actual Calendar Embed */}
        <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden min-h-[700px] shadow-2xl">
          {/* REPLACE THE 'src' BELOW WITH YOUR GOOGLE CALENDAR EMBED LINK */}
          <iframe 
            src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ19DYe_sXOy28i3S6MCrTkFBrcSCAX5K_eDXjwrWx0iSC13XMuJrh4uLBe0EWibdX0hbKKh8_eF?gv=true" 
            style={{ border: 0 }} 
            width="100%" 
            height="700" 
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
