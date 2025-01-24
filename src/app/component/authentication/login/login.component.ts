import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {email: "", password: ""};

  constructor(private authService: AuthService) {}

  onSubmit(form: any): void {
    if(form.valid) {
      this.authService.signIn({
        "email": this.formData.email.toString(),
        "password": this.formData.password.toString(),
      }).subscribe(result=>{
        console.log("===== API RESULT =====", result)
      })
    }
  }
}