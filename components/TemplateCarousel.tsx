import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Layout } from 'lucide-react';

const templates = [
  {
    title: "Corporate Blue",
    description: "Professional and trustworthy. Ideal for quarterly reports and financial updates.",
    color: "bg-blue-900",
    accent: "bg-blue-500"
  },
  {
    title: "Minimalist Dark",
    description: "Sleek, high-contrast design. Perfect for tech startups and product launches.",
    color: "bg-slate-900",
    accent: "bg-white"
  },
  {
    title: "Creative Spark",
    description: "Vibrant and energetic. Great for marketing pitches and creative agencies.",
    color: "bg-purple-900",
    accent: "bg-pink-500"
  },
  {
    title: "Nature & Eco",
    description: "Organic tones. Suited for sustainability reports and environmental topics.",
    color: "bg-emerald-900",
    accent: "bg-green-400"
  },
  {
    title: "Academic Clean",
    description: "Structure focused. Excellent for lectures, thesis defenses, and research.",
    color: "bg-slate-100",
    textColor: "text-slate-800",
    accent: "bg-slate-600"
  }
];

export const TemplateCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Explore Templates</h2>
          <p className="text-slate-400">Professional styles generated instantly by AI</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll('right')} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {templates.map((template, i) => (
          <div 
            key={i}
            className="flex-shrink-0 w-[300px] md:w-[350px] bg-slate-800/50 border border-slate-700 rounded-2xl p-4 snap-center hover:bg-slate-800 transition-colors group cursor-pointer"
          >
            {/* Mock Slide Preview */}
            <div className={`w-full h-[200px] ${template.color} rounded-xl mb-4 relative overflow-hidden shadow-lg border border-white/5`}>
              <div className={`absolute top-0 left-0 w-full h-2 ${template.accent}`}></div>
              <div className="p-6 h-full flex flex-col justify-center">
                <div className={`h-4 w-3/4 rounded mb-3 ${template.textColor ? 'bg-slate-300' : 'bg-white/20'}`}></div>
                <div className={`h-2 w-1/2 rounded ${template.textColor ? 'bg-slate-300' : 'bg-white/10'}`}></div>
                
                <div className="mt-8 grid grid-cols-2 gap-2">
                   <div className={`h-16 rounded-lg ${template.textColor ? 'bg-slate-200' : 'bg-white/5'}`}></div>
                   <div className={`h-16 rounded-lg ${template.textColor ? 'bg-slate-200' : 'bg-white/5'}`}></div>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Layout className="w-5 h-5 text-white/50" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{template.title}</h3>
            <p className="text-sm text-slate-400">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
