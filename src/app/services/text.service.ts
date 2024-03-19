import { Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Observable, from, map } from 'rxjs';
import { ChatContent } from '../models/chat-content';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private model: GenerativeModel;

  constructor() {
    const genAI = new GoogleGenerativeAI(localStorage.getItem('API_KEY')!);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  generateText(message: string): Observable<ChatContent> {
    return from(this.model.generateContent(message)).pipe(
      map(({ response }) => {
        const text = response.text();
        return {
          message: text,
          agent: 'chatbot',
        };
      })
    );
  }
}
