import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';
import { LineBreakPipe } from '../../pipes/line-break.pipe';
import { TextService } from '../../services/text.service';
import { ChatContent } from '../../models/chat-content';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MarkdownModule,
    LineBreakPipe,
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent {
  private textService = inject(TextService);
  contents: ChatContent[] = [];
  message: string = '';

  generateText(): void {
    const chatContent: ChatContent = {
      agent: 'user',
      message: this.message,
    };

    const loadingContent: ChatContent = {
      agent: 'chatbot',
      message: '...',
      loading: true,
    };

    this.contents = [
      ...this.contents,
      chatContent,
      loadingContent,
    ];

    this.message = '';

    this.textService.generateText(chatContent.message).subscribe((content) => {
      this.contents = [
        ...this.contents.filter((content) => !content.loading),
        content,
      ];
    });
  }
}
