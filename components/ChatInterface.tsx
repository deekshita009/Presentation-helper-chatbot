import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage, Sender } from '../types';
import { Send, FileDown, Bot, User, Menu, Sparkles, Loader2 } from 'lucide-react';
import { generatePptFile } from '../services/pptService';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  toggleSidebar: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  onSendMessage,
  toggleSidebar
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
    // Reset height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0f172a] relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center p-4 border-b border-slate-800 bg-[#0f172a] sticky top-0 z-10">
        <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-2 font-semibold text-white">SlideGenius</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-0 animate-fadeIn">
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">How can I help you present today?</h2>
              <p className="text-slate-400 max-w-md mx-auto">
                I can suggest topics, structure your deck, or generate a ready-to-download PowerPoint file.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full px-4">
              {[
                "Create a pitch deck for a fintech startup",
                "Give me 5 tips for public speaking",
                "Generate a presentation about Solar Energy",
                "Outline a Q4 marketing strategy"
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(suggestion)}
                  className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-xl text-left text-sm text-slate-300 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 max-w-3xl mx-auto ${
                msg.sender === Sender.USER ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === Sender.MODEL && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-blue-900/50">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%] ${
                  msg.sender === Sender.USER ? 'items-end' : 'items-start'
                }`}
              >
                <div className="text-xs text-slate-500 ml-1 mb-1 font-medium">
                  {msg.sender === Sender.USER ? 'You' : 'SlideGenius'}
                </div>
                
                <div
                  className={`px-5 py-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                    msg.sender === Sender.USER
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-[#1e293b] text-slate-200 border border-slate-700 rounded-bl-sm'
                  }`}
                >
                  {/* Basic Text Content */}
                  {msg.text}
                </div>

                {/* PPT Download Card */}
                {msg.pptData && (
                  <div className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <FileDown className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{msg.pptData.topic}</h4>
                        <p className="text-xs text-slate-400">{msg.pptData.slides.length} Slides • PowerPoint</p>
                      </div>
                    </div>
                    <button
                      onClick={() => generatePptFile(msg.pptData!)}
                      className="px-4 py-2 bg-white text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === Sender.USER && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-4 max-w-3xl mx-auto justify-start">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-blue-900/50">
                  <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-[#1e293b] border border-slate-700 px-5 py-4 rounded-2xl rounded-bl-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              <span className="text-slate-400 text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#0f172a] sticky bottom-0 z-20">
        <div className="max-w-3xl mx-auto relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask me to help with a presentation..."
            rows={1}
            className="w-full bg-[#1e293b] text-white rounded-xl pl-4 pr-12 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden max-h-[200px]"
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">
          AI can make mistakes. Please review generated presentations.
        </p>
      </div>
    </div>
  );
};