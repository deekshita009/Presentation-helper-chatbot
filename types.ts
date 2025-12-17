export enum Sender {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  isThinking?: boolean;
  pptData?: PresentationData; // If the message contains a generated PPT
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}

// Schema for PPT Generation
export interface SlidePoint {
  text: string;
}

export interface Slide {
  title: string;
  content: string[]; // Bullet points
  speakerNotes?: string;
}

export interface PresentationData {
  topic: string;
  slides: Slide[];
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
    process?: {
        env?: {
            API_KEY?: string;
        }
    }
  }
}