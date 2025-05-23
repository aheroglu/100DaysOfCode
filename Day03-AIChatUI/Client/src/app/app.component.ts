import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatSession } from './models/chat-session.model';
import { ChatService } from './services/chat.service';
import { StorageService } from './services/storage.service';
import { Message } from './models/message.model';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  sessions: ChatSession[] = [];
  currentSessions: ChatSession | null = null;
  newMessage = '';
  isLoading: boolean = false;
  isMobileSidebarOpen: boolean = false;

  constructor(
    private chatService: ChatService,
    private storageService: StorageService
  ) {
    this.checkTheme();
  }

  ngOnInit(): void {
    this.sessions = this.storageService.getSessions();

    if (this.sessions.length === 0) {
      this.createNewSession();
    } else {
      this.currentSessions = this.sessions.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0];
    }
  }

  createNewSession(): void {
    this.currentSessions = this.storageService.createSession('New Chat');
    this.sessions = this.storageService.getSessions();
  }

  selectSession(sessionId: string): void {
    const session = this.storageService.getSession(sessionId);

    if (session) {
      this.currentSessions = session;
    }
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.currentSessions) return;

    const message = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    const updatedSession = this.storageService.addMessageToSession(
      this.currentSessions.id,
      userMessage
    );

    if (updatedSession) {
      this.currentSessions = updatedSession;
      this.sessions = this.storageService.getSessions();
    }

    const apiMessages =
      this.currentSessions?.messages.map(({ role, content }) => ({
        role,
        content,
      })) || [];

    this.chatService.sendMessage(apiMessages).subscribe({
      next: (response) => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.choices[0].message.content,
          timestamp: new Date(),
        };

        if (this.currentSessions) {
          const updatedSession = this.storageService.addMessageToSession(
            this.currentSessions.id,
            assistantMessage
          );

          if (updatedSession) {
            this.currentSessions = updatedSession;
            this.sessions = this.storageService.getSessions();
          }

          this.isLoading = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('API Error:', error);
        this.isLoading = false;
      },
    });
  }

  deleteSession(sessionId: string): void {
    this.storageService.deleteSession(sessionId);
    this.sessions = this.storageService.getSessions();

    if (this.currentSessions?.id === sessionId) {
      this.currentSessions =
        this.sessions.length > 0
          ? this.sessions.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )[0]
          : null;
    }
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  toggleTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
    this.checkTheme();
  }

  checkTheme() {
    const theme = localStorage.getItem('theme');

    if (theme === 'light') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
