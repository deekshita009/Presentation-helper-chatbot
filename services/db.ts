import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ChatSession } from '../types';

interface SlideGeniusDB extends DBSchema {
  sessions: {
    key: string;
    value: ChatSession;
    indexes: { 'by-date': number };
  };
}

const DB_NAME = 'slidegenius-db';
const STORE_NAME = 'sessions';

class ChatDatabase {
  private dbPromise: Promise<IDBPDatabase<SlideGeniusDB>>;

  constructor() {
    this.dbPromise = openDB<SlideGeniusDB>(DB_NAME, 1, {
      upgrade(db) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('by-date', 'updatedAt');
      },
    });
  }

  async getAllSessions(): Promise<ChatSession[]> {
    const db = await this.dbPromise;
    // Get all sessions and sort by date descending
    const sessions = await db.getAllFromIndex(STORE_NAME, 'by-date');
    return sessions.reverse();
  }

  async getSession(id: string): Promise<ChatSession | undefined> {
    const db = await this.dbPromise;
    return db.get(STORE_NAME, id);
  }

  async saveSession(session: ChatSession): Promise<void> {
    const db = await this.dbPromise;
    await db.put(STORE_NAME, session);
  }

  async deleteSession(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(STORE_NAME, id);
  }
}

export const chatDB = new ChatDatabase();
