import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MarkdownComponent } from 'ngx-markdown';
import { LineBreakPipe } from '../../pipes/line-break.pipe';
import { ChatService } from '../../services/chat.service';
import { ChatContent } from '../../models/chat-content';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MarkdownComponent,
    LineBreakPipe,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  private chatService = inject(ChatService);
  contents: ChatContent[] = [];
  message: string = '';

  sendMessage(): void {
    const chatContent: ChatContent = {
      agent: 'user',
      message: this.message,
    };

    const loadingContent: ChatContent = {
      agent: 'chatbot',
      message: '...',
      loading: true,
    };

    this.contents = [...this.contents, chatContent, loadingContent];

    this.message = '';

    this.chatService.chat(chatContent).subscribe((content) => {
      this.contents = [
        ...this.contents.filter((content) => !content.loading),
        content,
      ];
    });
  }
}
