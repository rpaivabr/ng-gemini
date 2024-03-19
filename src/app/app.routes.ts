import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { TextComponent } from './pages/text/text.component';
import { VisionComponent } from './pages/vision/vision.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'text' },
  { path: 'chat', component: ChatComponent },
  { path: 'text', component: TextComponent },
  { path: 'vision', component: VisionComponent },
];
