import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = ''; // YOUR OPENAI API KEY

  constructor(private http: HttpClient) {}

  sendMessage(messages: Message[]): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
