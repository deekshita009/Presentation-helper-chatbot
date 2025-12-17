import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { LandingPage } from './components/LandingPage';
import { StrategiesPage } from './components/StrategiesPage';
import { ChatSession, ChatMessage, Sender, PresentationData } from './types';
import { streamGeminiResponse } from './services/geminiService';
import { chatDB } from './services/db';
import { KeyRound, MonitorPlay } from 'lucide-react';

const generateId = () => Math.random().toString(36).substring(2, 15);

type ViewState = 'landing' | 'chat' | 'strategies';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isCheckingKey, setIsCheckingKey] = useState(true);

  // Check for API Key on mount
  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio) {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(hasKey);
        } else {
          setHasApiKey(true);
        }
      } catch (e) {
        console.error("Error checking API key:", e);
        setHasApiKey(true);
      } finally {
        setIsCheckingKey(false);
      }
    };
    checkKey();
  }, []);

  // Load from IndexedDB on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const loadedSessions = await chatDB.getAllSessions();
        setSessions(loadedSessions);
        if (loadedSessions.length > 0 && view === 'chat') {
          setCurrentSessionId(loadedSessions[0].id);
        }
      } catch (e) {
        console.error("Failed to load sessions from DB", e);
      }
    };
    loadSessions();
  }, [view]);

  // Sync state changes to DB
  const saveSessionToDB = async (session: ChatSession) => {
      await chatDB.saveSession(session);
  };

  const deleteSessionFromDB = async (id: string) => {
      await chatDB.deleteSession(id);
  };

  const handleConnectApiKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const getCurrentSession = () => sessions.find(s => s.id === currentSessionId);

  const startNewChat = async () => {
    const newSession: ChatSession = {
      id: generateId(),
      title: 'New Presentation',
      messages: [],
      updatedAt: Date.now()
    };
    
    await saveSessionToDB(newSession);
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setSidebarOpen(false); 
    setView('chat'); 
  };

  const deleteSession = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await deleteSessionFromDB(id);
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (currentSessionId === id) {
      if (newSessions.length > 0) {
        setCurrentSessionId(newSessions[0].id);
      } else {
        setCurrentSessionId(null);
      }
    }
  };

  const updateSessionMessages = async (sessionId: string, newMessages: ChatMessage[]) => {
    const currentSession = sessions.find(s => s.id === sessionId);
    if (!currentSession) return;

    let title = currentSession.title;
    // Update title logic
    if (currentSession.messages.length === 0 && newMessages.length > 0) {
        const firstUserMsg = newMessages.find(m => m.sender === Sender.USER);
        if (firstUserMsg) {
            title = firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '');
        }
    }

    const updatedSession = { ...currentSession, messages: newMessages, title, updatedAt: Date.now() };
    
    // Optimistic UI Update
    setSessions(prev => prev.map(s => s.id === sessionId ? updatedSession : s));
    
    // DB Update
    await saveSessionToDB(updatedSession);
  };

  const handleSendMessage = async (text: string) => {
    let activeSessionId = currentSessionId;

    if (!activeSessionId) {
        const newSession: ChatSession = {
            id: generateId(),
            title: 'New Presentation',
            messages: [],
            updatedAt: Date.now()
        };
        await saveSessionToDB(newSession);
        setSessions(prev => [newSession, ...prev]);
        activeSessionId = newSession.id;
        setCurrentSessionId(activeSessionId);
    }
    
    const currentSession = sessions.find(s => s.id === activeSessionId) || { messages: [] };
    
    const userMessage: ChatMessage = {
      id: generateId(),
      sender: Sender.USER,
      text: text,
      timestamp: Date.now()
    };

    const updatedMessages = [...currentSession.messages, userMessage];
    await updateSessionMessages(activeSessionId!, updatedMessages);
    setIsLoading(true);

    const botMessageId = generateId();
    
    const history = updatedMessages.map(m => ({
        role: m.sender === Sender.USER ? 'user' : 'model',
        parts: [{ text: m.text }]
    }));

    const historyForApi = history.slice(0, -1);

    await streamGeminiResponse(
      historyForApi,
      text,
      (streamedText) => {
        // We only update state for streaming to avoid DB hammering
        setSessions(prev => prev.map(s => {
            if (s.id === activeSessionId) {
                 const msgs = [...updatedMessages, {
                    id: botMessageId,
                    sender: Sender.MODEL,
                    text: streamedText,
                    timestamp: Date.now()
                 }];
                 return { ...s, messages: msgs };
            }
            return s;
        }));
      },
      (finalText, pptData) => {
        const finalBotMessage: ChatMessage = {
          id: botMessageId,
          sender: Sender.MODEL,
          text: finalText,
          pptData: pptData,
          timestamp: Date.now()
        };
        // Save final state to DB
        updateSessionMessages(activeSessionId!, [...updatedMessages, finalBotMessage]);
        setIsLoading(false);
      }
    );
  };

  // 1. Loading State
  if (isCheckingKey) {
    return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-slate-500">Connecting...</div>;
  }

  // 2. API Key Gate
  if (!hasApiKey) {
    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 text-center font-sans">
            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-8 border border-blue-500/20">
               <MonitorPlay className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">SlideGenius AI</h1>
            <p className="text-slate-400 max-w-md mb-10 text-lg leading-relaxed">
                To generate presentations, please connect your Google API Key.
            </p>
            <button 
                onClick={handleConnectApiKey}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-900/30 flex items-center gap-3"
            >
                <KeyRound className="w-5 h-5" />
                Connect with Google
            </button>
            <p className="mt-12 text-sm text-slate-600">
                Using Gemini 2.5 Flash • 
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="ml-1 underline hover:text-slate-400">
                  Billing Information
                </a>
            </p>
        </div>
    );
  }

  // 3. Routing
  if (view === 'landing') {
    return <LandingPage 
      onStartChat={() => {
        if (!currentSessionId && sessions.length > 0) {
            setCurrentSessionId(sessions[0].id);
        } else if (!currentSessionId) {
             startNewChat();
             return; // startNewChat handles setView
        }
        setView('chat');
      }} 
      onNavigateToStrategies={() => setView('strategies')}
    />;
  }

  if (view === 'strategies') {
    return <StrategiesPage 
      onBack={() => setView('landing')}
      onStartChat={() => {
        if (!currentSessionId && sessions.length > 0) {
            setCurrentSessionId(sessions[0].id);
        } else if (!currentSessionId) {
             startNewChat();
             return;
        }
        setView('chat');
      }} 
    />;
  }

  // Chat View
  const currentMessages = getCurrentSession()?.messages || [];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f172a]">
      <Sidebar 
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={startNewChat}
        onSelectSession={(id) => { setCurrentSessionId(id); setSidebarOpen(false); }}
        onDeleteSession={deleteSession}
        onGoHome={() => setView('landing')}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <ChatInterface 
        messages={currentMessages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
};

export default App;