import { Component } from '@angular/core';
import { AddCarsComponent } from '../add-cars/add-cars.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';


@Component({
  selector: 'app-admin-header',
  imports: [RouterOutlet,AddCarsComponent,NotificationsComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(private router: Router) {}

  navigateToAddCars() {
    this.router.navigate(['/add-cars']).then((success) => {
      console.log('Navigation successful:', success);
    });

  }

  navigateTonotifi(){
    this.router.navigate(['/notifications']).then((success) => {
      console.log('Navigation successful:', success);
    });
  }
 
}
