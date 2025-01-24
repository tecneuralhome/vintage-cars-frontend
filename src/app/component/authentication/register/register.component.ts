import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    formData = {email: "", password: "", username: ""};

    constructor(private authService: AuthService) {}

    onSubmit(form: any): void {
      if(form.valid) {
        console.log("called")
        this.authService.signUp({
          "username": this.formData.username.toString(),
          "email": this.formData.email.toString(),
          "password": this.formData.password.toString(),
        }).subscribe(result=>{
          console.log("===== API RESULT =====", result)
        })
      }
    }
}
