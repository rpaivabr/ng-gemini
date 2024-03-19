import { Injectable } from '@angular/core';
import {
  GenerativeModel,
  GoogleGenerativeAI,
  InlineDataPart,
} from '@google/generative-ai';
import { Observable, from, map } from 'rxjs';
import { ChatContent } from '../models/chat-content';
import { ImageFile } from '../models/image-file';

@Injectable({
  providedIn: 'root',
})
export class VisionService {
  private model: GenerativeModel;

  constructor() {
    const genAI = new GoogleGenerativeAI(localStorage.getItem('API_KEY')!);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
  }

  vision(message: string, imageFile: ImageFile): Observable<ChatContent> {
    console.log(message, imageFile);
    const imageDataPart: InlineDataPart = {
      inlineData: {
        data: imageFile.preview.substring(imageFile.preview.indexOf(',') + 1),
        mimeType: imageFile.file.type,
      },
    };

    return from(this.model.generateContent([message, imageDataPart])).pipe(
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
