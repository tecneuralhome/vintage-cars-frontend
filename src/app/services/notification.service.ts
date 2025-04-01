import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<{ message: string; type: 'success' | 'error' }>();
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string, type: 'success' | 'error' = 'success') {
    this.notificationSubject.next({ message, type });
  }
}
