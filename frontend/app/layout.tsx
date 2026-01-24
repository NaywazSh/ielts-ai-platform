import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar"; // Import the sidebar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IELTS AI Master",
  description: "AI Powered Exam Scoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950`}>
        <div className="flex min-h-screen">
          {/* The Sidebar (Fixed) */}
          <Sidebar />
          
          {/* The Main Content Area (Scrollable) */}
          <main className="flex-1 ml-64 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
