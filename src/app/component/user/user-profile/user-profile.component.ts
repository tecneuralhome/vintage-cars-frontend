import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: any = null; 
   editForm!: FormGroup;
   editSettings!: FormGroup;
   settingsForm: boolean = true;
   showOtpStep: boolean = false;
  //  isEditing = false;
  countdown: number = 180; // 3 minutes in seconds
  isResendEnabled: boolean = false;
  timerInterval: any;
  constructor( private authservice: AuthService, 
     private fb: FormBuilder,
     private notificationService: NotificationService,
     private router:Router
  ){
    this.editForm = this.fb.group({
      username: ['', Validators.required], 
    });

    this.editSettings = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', Validators.minLength(6)],
      otp: ['', Validators.required],
    })

    this.editSettings.get('otp')?.disable();
  }

  ngOnInit(): void {
    this.fetchUserList();
  }

  startCountdown(): void {
    this.countdown = 180; // Reset timer
    this.isResendEnabled = false;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timerInterval);
        this.isResendEnabled = true;
      }
    }, 1000);
  }

  fetchUserList(): void {
    const params = {
      page: 1,
      limit: 10
    };

    this.authservice.getUserList(params).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.user = response.users;
          console.log(this.user, "profile-=========")
          this.editForm!.patchValue({ username: this.user[0].username });
          this.editSettings!.patchValue({ email: this.user[0].email });
          this.editSettings!.patchValue({ number: this.user[0].number });
        } else{
          console.error('Selected user is undefined.');
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value; // Only contains id and username
      this.authservice.updateUser(updatedData).subscribe({
        next: (response) => {
          this.editForm.reset(); // Clear the form after update
          // this.fetchUserList();
          this.notificationService.showNotification('User data updated!', 'success');
          setTimeout(() => {
            this.router.navigate(['/Home-page']);
          }, 2000);
        },
        error: (err) => {
          this.notificationService.showNotification('something went wrong!', 'error');
        },
      });
    } else {
    
    }
  }

  // edit(){
  //   this.isEditing = !this.isEditing
  // }

  onSettings(){
    if (this.showOtpStep) {
      this.editSettings.get('otp')?.enable();

      if (this.editSettings.valid) {
        const formData = this.editSettings.value;
        this.authservice.updateConact({
          email: formData.email,
          password: formData.password,
          number: formData.number,
          type: "number",
          otp: formData.otp
        }).subscribe({
          next: result => {
            console.log('Register API Response:', result);
            this.notificationService.showNotification('User data updated!', 'success');
            setTimeout(() => {
              this.router.navigate(['/Home-page']);
            }, 2000);
          }, error: (error) => {
            this.notificationService.showNotification('OTP Expired or Invalid OTP', 'error');
          }
        });
      }
    } else {
      if (this.editSettings.valid) {
        this.authservice.otp({
          number: this.editSettings.value.number,
          type: 'update'
        }).subscribe({
          next: (result) => {
            console.log(result, "otp calling")
            this.showOtpStep = true;
            this.editSettings.get('otp')?.enable();
            this.startCountdown();
            this.notificationService.showNotification('OTP sent!', 'success');
          },
          error: (error) => {
            console.log(error)
            this.notificationService.showNotification("This number or email already exists!!!", 'error');
          }
        })
      }
    }
  }

  resendOtp(): void {
    if (this.isResendEnabled) {
      this.authservice.otp({
        number: this.editSettings.value.number,
        type: 'register'
      }).subscribe({
        next: () => {
          this.notificationService.showNotification('OTP Resent!', 'success');
          this.startCountdown();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }


  settingRoute(){
    this.settingsForm = !this.settingsForm
  }
}
