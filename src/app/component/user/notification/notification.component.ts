import { CommonModule } from '@angular/common';
import { Component, Input, OnInit  } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' = 'success';
  isVisible: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => {
      this.message = notification.message;
      this.type = notification.type;
      this.isVisible = true;

      setTimeout(() => this.hide(), 3000); // Auto-hide after 3 seconds
    });
  }

  hide() {
    this.isVisible = false;
  }
}
