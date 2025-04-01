import { Component, EventEmitter, Output, output, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-header',
  imports: [LoginComponent, RegisterComponent, CommonModule, NotificationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isNavbarOpen = false;
  userIn: boolean = false

  @Output() loginType = new EventEmitter<void>();

  constructor(private notificationService: NotificationService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.userIn = true;
    }
  }

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  onCollectionsClick() {
    this.sharedService.triggerCollectionClick();
  }
  
  loginInfo() {
    this.userIn = true;
    this.notificationService.showNotification('LogIn successful!', 'success');
  }

  handleLoginFailure() {
    this.notificationService.showNotification('Incorrect Username or password!', 'error');
  }

  regSuccess() {
    this.notificationService.showNotification('Register successful!', 'success');
    const logIn = document.getElementById('loginActive')
    logIn?.click()
  }

  regFailed() {
    this.notificationService.showNotification('OTP Expired or Invalid OTP', 'error');
  }

  adminLogin() {
    this.loginType.emit()
    console.log("header admin")
  }

  userProfile() {
    this.router.navigate(['/user-profile']);
    console.log("profile click----------")
  }

  logOut() {
    this.userIn = false;
    localStorage.removeItem('authToken');
    localStorage.removeItem('usertype');
    this.router.navigate(['/Home-page']);
  }
}
