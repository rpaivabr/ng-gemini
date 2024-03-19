import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LineBreakPipe } from '../../pipes/line-break.pipe';
import { VisionService } from '../../services/vision.service';
import { ChatContent } from '../../models/chat-content';
import { ImageFile } from '../../models/image-file';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    LineBreakPipe,
  ],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.scss',
  host: {
    class: 'contents',
  },
})
export class VisionComponent {
  private visionService = inject(VisionService);
  contents: ChatContent[] = [];
  message: string = '';
  imageFile?: ImageFile;

  removeImage() {
    this.imageFile = undefined;
  }

  sendMessage(): void {
    if (!this.imageFile) {
      return;
    }

    const chatContent: ChatContent = {
      agent: 'user',
      message: this.message,
      imagePreview: this.imageFile.preview,
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

    this.visionService.vision(this.message, this.imageFile).subscribe((content) => {
      this.contents = [
        ...this.contents.filter((content) => !content.loading),
        content,
      ];
    });

    this.message = '';
    this.imageFile = undefined;
  }

  selectImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const preview = e.target?.result as string;
        this.imageFile = { file, preview };
      };

      reader.readAsDataURL(file);
    }
  }
}
