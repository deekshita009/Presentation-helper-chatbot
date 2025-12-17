import React from 'react';
import { MonitorPlay, LayoutTemplate, Zap, Presentation, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TemplateCarousel } from './TemplateCarousel';

interface LandingPageProps {
  onStartChat: () => void;
  onNavigateToStrategies: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, onNavigateToStrategies }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-y-auto custom-scrollbar">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MonitorPlay className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold tracking-tight">SlideGenius</span>
          </div>
          <button 
            onClick={onStartChat}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-900/20 text-sm flex items-center gap-2"
          >
            Launch AI
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            The Future of Presentations is Here
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400">
            Design Presentations <br /> in Seconds with AI.
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            SlideGenius isn't just a template library. It's an intelligent assistant that structures your thoughts, writes your content, and builds downloadable PowerPoint files instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartChat}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Start Building Now
            </button>
            <button 
              onClick={onNavigateToStrategies}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-lg transition-all border border-slate-700 flex items-center justify-center"
            >
              Learn Strategies
            </button>
          </div>
        </div>
      </header>

      {/* Template Carousel (New Section) */}
      <section className="bg-[#0B1120] border-y border-slate-800">
         <TemplateCarousel />
      </section>

      {/* Why Presentations Matter */}
      <section className="py-24 bg-[#1e293b]/30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Great Presentations Matter</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              In the corporate and academic world, presentations are the currency of ideas. A well-structured deck does more than display information; it persuades, educates, and inspires action.
            </p>
            <ul className="space-y-4">
              {[
                "Visual retention is 65% higher than audio alone.",
                "Structured narratives lead to 40% faster decision making.",
                "Professional design establishes immediate credibility."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl transform rotate-3"></div>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 relative shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Presentation className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">The SlideGenius Advantage</h3>
                  <p className="text-slate-400 text-sm">Automated workflow</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                <div className="h-32 bg-slate-700/50 rounded-xl mt-6 border border-slate-600 border-dashed flex items-center justify-center text-slate-500 text-sm">
                  AI Generated Layout
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">One Tool, Endless Use Cases</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Whether you are a startup founder, a university professor, or a marketing executive, structure is key.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <LayoutTemplate className="w-6 h-6 text-purple-400" />,
              title: "Startup Pitch Decks",
              desc: "Convince investors with problem-solution narratives, market analysis, and financial projections."
            },
            {
              icon: <Presentation className="w-6 h-6 text-blue-400" />,
              title: "Corporate Reports",
              desc: "Turn quarterly data into digestible insights using clear bullet points and structured summaries."
            },
            {
              icon: <MonitorPlay className="w-6 h-6 text-green-400" />,
              title: "Educational Lectures",
              desc: "Create engaging lesson plans with clear learning objectives and summary slides."
            }
          ].map((card, i) => (
            <div key={i} className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 p-8 rounded-2xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-slate-700">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Extended Features / More Content */}
      <section className="py-24 bg-slate-900/50 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Comprehensive Features</h2>
            <div className="grid md:grid-cols-4 gap-6">
               <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-lg mb-2 text-blue-400">Smart Outlining</h3>
                  <p className="text-sm text-slate-400">AI analyzes your topic and suggests the most logical flow for your arguments.</p>
               </div>
               <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-lg mb-2 text-purple-400">Content Expansion</h3>
                  <p className="text-sm text-slate-400">Turn simple bullet points into fully fleshed-out paragraphs and speaker notes.</p>
               </div>
               <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-lg mb-2 text-green-400">Format Export</h3>
                  <p className="text-sm text-slate-400">Directly download .pptx files compatible with PowerPoint, Google Slides, and Keynote.</p>
               </div>
               <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-lg mb-2 text-orange-400">Theme Advice</h3>
                  <p className="text-sm text-slate-400">Get recommendations on color psychology and visual styles matching your audience.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-slate-600" />
            <span className="text-slate-500 font-medium">SlideGenius AI &copy; 2024</span>
          </div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <button className="hover:text-blue-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-blue-400 transition-colors">Terms of Use</button>
            <button className="hover:text-blue-400 transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};