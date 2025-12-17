import React from 'react';
import { MonitorPlay, ArrowLeft, Target, Lightbulb, Users, Clock, Layout, Mic } from 'lucide-react';

interface StrategiesPageProps {
  onBack: () => void;
  onStartChat: () => void;
}

export const StrategiesPage: React.FC<StrategiesPageProps> = ({ onBack, onStartChat }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-y-auto custom-scrollbar">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            onClick={onBack}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </div>
          <div className="flex items-center gap-2 opacity-50">
            <MonitorPlay className="w-6 h-6" />
            <span className="font-bold tracking-tight">Learning Hub</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-400">
            Master the Art of Presentation
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A comprehensive guide to structuring, designing, and delivering world-class presentations using proven methodologies.
          </p>
        </div>

        {/* Section 1: Structure */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">1. Strategic Structuring</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-blue-200">The S.C.Q.A Framework</h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                Used by top management consultants (like McKinsey) to ensure clarity.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-slate-300">
                  <span className="font-bold text-white min-w-[80px]">Situation:</span>
                  <span>State what is happening now (The Status Quo).</span>
                </li>
                <li className="flex gap-3 text-slate-300">
                  <span className="font-bold text-white min-w-[80px]">Complication:</span>
                  <span>Identify the problem or change in the situation.</span>
                </li>
                <li className="flex gap-3 text-slate-300">
                  <span className="font-bold text-white min-w-[80px]">Question:</span>
                  <span>State the core question this raises.</span>
                </li>
                <li className="flex gap-3 text-slate-300">
                  <span className="font-bold text-white min-w-[80px]">Answer:</span>
                  <span>Provide your solution (The Resolution).</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-purple-200">The Rule of Three</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                The human brain patterns information effectively in threes. When listing benefits, reasons, or roadmap steps, always try to group them into three distinct pillars.
              </p>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 mt-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Example</p>
                <p className="text-slate-300 italic">"Our solution is Faster, Cheaper, and More Reliable."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Visual Design */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400">
              <Layout className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">2. Visual Hierarchy & Design</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 mb-8">
            <h3 className="text-2xl font-bold mb-6">The 5-Second Test</h3>
            <p className="text-slate-300 mb-6 text-lg">
              A viewer should be able to understand the core message of a slide within 5 seconds. If they have to read a paragraph, you have lost their attention.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="p-4 bg-black/20 rounded-xl">
                 <h4 className="font-bold text-red-400 mb-2">Avoid</h4>
                 <p className="text-sm text-slate-400">Walls of text, complete sentences, and cluttered charts with too many data points.</p>
               </div>
               <div className="p-4 bg-black/20 rounded-xl">
                 <h4 className="font-bold text-green-400 mb-2">Adopt</h4>
                 <p className="text-sm text-slate-400">Large font sizes (30pt+), high-quality imagery, and one key takeaway per slide.</p>
               </div>
               <div className="p-4 bg-black/20 rounded-xl">
                 <h4 className="font-bold text-blue-400 mb-2">Contrast</h4>
                 <p className="text-sm text-slate-400">Use dark backgrounds for low-light rooms and light backgrounds for bright rooms.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Section 3: Delivery */}
        <section className="mb-20">
           <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center text-green-400">
              <Mic className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">3. Delivery & Engagement</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                 <Clock className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">The 10-20-30 Rule</h3>
                <p className="text-slate-400 mt-2">
                   Popularized by Guy Kawasaki. A presentation should have <span className="text-white font-bold">10 slides</span>, last no more than <span className="text-white font-bold">20 minutes</span>, and contain no font smaller than <span className="text-white font-bold">30 points</span>.
                </p>
              </div>
            </div>

             <div className="flex gap-6 items-start">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                 <Users className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Engage Early</h3>
                <p className="text-slate-400 mt-2">
                   Don't start with "My name is X and today I will talk about Y." Start with a startling statistic, a provocative question, or a relatable story to hook the audience immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
           
           <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Ready to Apply These Strategies?</h2>
           <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
             Let SlideGenius AI structure your next deck using these exact principles.
           </p>
           <button 
             onClick={onStartChat}
             className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:bg-blue-50 transition-colors relative z-10 flex items-center gap-2 mx-auto"
           >
             <Lightbulb className="w-5 h-5" />
             Create Presentation Now
           </button>
        </div>

      </div>
    </div>
  );
};
