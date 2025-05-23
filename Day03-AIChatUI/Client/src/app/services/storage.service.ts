import { Injectable } from '@angular/core';
import { ChatSession } from '../models/chat-session.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly STORAGE_KEY = 'chat_sessions';

  getSessions(): ChatSession[] {
    const sessions = localStorage.getItem(this.STORAGE_KEY);
    return sessions ? JSON.parse(sessions) : [];
  }

  getSession(id: string): ChatSession | undefined {
    const sessions = this.getSessions();
    return sessions.find((session) => session.id === id);
  }

  createSession(title: string): ChatSession {
    const sessions = this.getSessions();
    const newSession: ChatSession = {
      id: this.generateId(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    sessions.push(newSession);
    this.saveSessions(sessions);
    return newSession;
  }

  addMessageToSession(sessionId: string, message: Message): ChatSession | null {
    const sessions = this.getSessions();
    const sessionIndex = sessions.findIndex((s) => s.id === sessionId);

    if (sessionIndex !== -1) {
      // Add the message
      sessions[sessionIndex].messages.push(message);
      sessions[sessionIndex].updatedAt = new Date();

      // If this is the first user message and the title is still "New Chat", update the title
      if (
        message.role === 'user' &&
        sessions[sessionIndex].messages.length === 1 &&
        (sessions[sessionIndex].title === 'New Chat' || sessions[sessionIndex].title === 'Yeni Sohbet')
      ) {
        // Create a title from the message content (first 30 characters)
        let newTitle = message.content.trim();

        // Shorten the title (if it's too long)
        if (newTitle.length > 30) {
          newTitle = newTitle.substring(0, 27) + '...';
        }

        sessions[sessionIndex].title = newTitle;
      }

      this.saveSessions(sessions);
      return sessions[sessionIndex];
    }

    return null;
  }

  deleteSession(id: string): void {
    let sessions = this.getSessions();
    sessions = sessions.filter((s) => s.id !== id);
    this.saveSessions(sessions);
  }

  private saveSessions(sessions: ChatSession[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
