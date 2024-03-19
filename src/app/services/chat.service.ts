import { Injectable } from '@angular/core';
import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { Observable, from, map } from 'rxjs';
import { ChatContent } from '../models/chat-content';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private model: GenerativeModel;
  private chatSession: ChatSession;
  
  constructor() {
    const genAI = new GoogleGenerativeAI(localStorage.getItem('API_KEY')!);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.chatSession = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: `You're a poet. Respond to all questions with a rhyming poem.
            What is the capital of California?
          `,
        },
        {
          role: 'model',
          parts:
            'If the capital of California is what you seek, Sacramento is where you ought to peek.',
        },
      ],
    });
  }

  chat(chatContent: ChatContent): Observable<ChatContent> {
    return from(this.chatSession.sendMessage(chatContent.message)).pipe(
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
