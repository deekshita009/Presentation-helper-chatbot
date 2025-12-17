import React from 'react';
import { ChatSession } from '../types';
import { MessageSquare, Plus, MonitorPlay, Trash2, Home } from 'lucide-react';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (e: React.MouseEvent, id: string) => void;
  onGoHome: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onGoHome,
  isOpen,
  toggleSidebar
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Content */}
      <div 
        className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-[#0B1120] border-r border-slate-800 
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div 
          className="p-4 border-b border-slate-800 flex items-center gap-2 cursor-pointer hover:bg-slate-800/50 transition-colors group"
          onClick={onGoHome}
          title="Back to Home"
        >
          <MonitorPlay className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
          <h1 className="text-lg font-bold text-white tracking-tight">SlideGenius</h1>
        </div>

        {/* New Chat Button */}
        <div className="p-4 space-y-2">
           <button
            onClick={onGoHome}
            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-medium text-sm border border-slate-700"
          >
            <Home className="w-4 h-4" />
            Back to Website
          </button>
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium text-sm shadow-lg shadow-blue-900/20"
          >
            <Plus className="w-4 h-4" />
            New Presentation
          </button>
        </div>

        {/* Recent Chats List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          <div className="px-2 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            History
          </div>
          {sessions.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-600 text-sm">
              No recent chats
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className={`
                  group relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors
                  ${currentSessionId === session.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                `}
                onClick={() => onSelectSession(session.id)}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="truncate text-sm flex-1">{session.title}</span>
                
                <button 
                  onClick={(e) => onDeleteSession(e, session.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                  title="Delete chat"
                >
                    <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* User Profile / Footer */}
        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                JS
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Presenter</div>
                <div className="text-xs text-slate-500">Pro Plan</div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};