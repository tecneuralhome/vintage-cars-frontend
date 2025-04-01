import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-login',
  imports: [CommonModule],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.css'
})
export class AppLoginComponent {
    @Input() message: string = '';
    @Input() type: 'success' | 'error' = 'success';
    isVisible: boolean = false;
  
    show(message: string, type: 'success' | 'error' = 'success') {
      this.message = message;
      this.type = type;
      this.isVisible = true;
    }
    
  
    hide() {
      this.isVisible = false;
    }
}
