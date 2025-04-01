import { Component, EventEmitter, Output } from '@angular/core';
import { AddCarsComponent } from '../add-cars/add-cars.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component';


@Component({
  selector: 'app-admin-header',
  imports: [RouterOutlet,AddCarsComponent,AdminNotificationComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

   @Output() adminRes = new EventEmitter<void>(); 
   
  constructor(private router: Router) {}

  navigateToAddCars() {
    this.router.navigate(['/add-cars']).then((success) => {
      console.log('Navigation successful:', success);
    });

  }

  navigateTonotifi(){
    this.router.navigate(['/booking-managements']).then((success) => {
      console.log('Navigation successful:', success);
    });
  }

  navigateToAddSlider(){
    this.router.navigate(['/add-slider-content']).then((success) => {
      console.log('Navigation successful:', success);
    });
  }

  navigateToUsers(){
    this.router.navigate(['/user-list']).then((success) => {
      console.log('Navigation successful:', success);
    });
  }

  navigateToCarsList(){
    this.router.navigate(['/cars-list']).then((success) => {
      console.log('Navigation successful:', success);
    });
  }
  
  logOut(){
    this.adminRes.emit()
  }
}
