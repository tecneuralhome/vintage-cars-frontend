import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  @Output() loginSuccess = new EventEmitter<void>(); 
  @Output() loginType = new EventEmitter<void>();
  @Output() loginFailed = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.authService.signIn({
        email: this.loginForm.value.email.toString(),
        password: this.loginForm.value.password.toString()
      }).subscribe({
        next: (results) => {
          console.log('Login Successful:', results);
          const close = document.getElementById('close-btn')
          close?.click()
          if(results.usertype === "admin")
            {
              this.loginType.emit();
              console.log("emit user ----")
            } 

          if(results.usertype === "user"){
            this.loginSuccess.emit(); 
          }
          
          const token = results.token;
          const usertype = results.usertype
          if (token) {
            localStorage.setItem('authToken', token); 
            localStorage.setItem('usertype', usertype)
            console.log('Token saved to localStorage');
          } else {
            console.error('Token not found in response');
          }
         
        },
        error: (error) => {
          console.error('Login failed:', error);
          // const close = document.getElementById('close-btn')
          // close?.click()
          this.loginFailed.emit();
        }
      });
    } else {
      console.error('Login form is invalid');
    }
  }

  
}
