import { Component, ViewChild, EventEmitter, OnInit, Output, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../../../services/notification.service';




@Component({
  selector: 'app-register',
  standalone: true, // Standalone component for Angular 14+ (optional)
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent], // Include necessary imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showOtpStep: boolean = false;
  isModalVisible: boolean = false;
  countdown: number = 180; // 3 minutes in seconds
  isResendEnabled: boolean = false;
  timerInterval: any;

  @Output() registerSuccess = new EventEmitter<void>();
  @Output() registerFailed = new EventEmitter<void>();

  @ViewChild('closeBtn') closeBtn!: ElementRef;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private renderer: Renderer2,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      otp: ['', Validators.required],
    });

    this.registerForm.get('otp')?.disable();
  }

  ngOnInit(): void { }

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



  // onRegister(): void {
  //   console.log("showOtpStep", this.showOtpStep);

  //   if (this.showOtpStep) {
  //     this.registerForm.get('otp')?.enable();

  //     if (this.registerForm.valid) {
  //       const formData = this.registerForm.value;
  //       this.authService.signUp({
  //         username: formData.username,
  //         email: formData.email,
  //         password: formData.password,
  //         number: formData.number,
  //         usertype: "user",
  //         otp: formData.otp
  //       }).subscribe({
  //         next: result => {
  //           console.log('Register API Response:', result);
  //           this.registerSuccess.emit()
  //           this.closeBtn?.nativeElement.click();
  //           this.showOtpStep = false;
  //         }, error: (error) => {
  //           this.registerFailed.emit()
  //           this.registerForm.reset()
  //           this.closeBtn?.nativeElement.click();
  //           this.showOtpStep = false;
  //         }
  //       });
  //     }
  //   } else {
  //     if (this.registerForm.valid) {
  //       this.authService.otp({
  //         number: this.registerForm.value.number,
  //         type: 'register'
  //       }).subscribe({
  //         next: (result) => {
  //           console.log(result)
  //           this.showOtpStep = true;
  //           this.registerForm.get('otp')?.enable();
  //           this.notificationService.showNotification(result.message, 'success');
  //           this.startCountdown();
  //         },
  //         error: (error) => {
  //           console.log(error)
  //           this.notificationService.showNotification("This number or email already exists!!!", 'error');
  //         }
  //       })
  //     }
  //   }
  // }
  onRegister(): void {
    console.log("showOtpStep", this.showOtpStep);
    if (this.registerForm.valid) {
      this.authService.otp({
        number: this.registerForm.value.number,
        type: 'register'
      }).subscribe({
        next: (result) => {
          console.log("==== GENERATE OTP RESULT =====", result);
          // this.showOtpStep = true;
          // this.registerForm.get('otp')?.enable();
          // this.notificationService.showNotification(result.message, 'success');
          // this.startCountdown();
          if (result.status) {
            const formData = this.registerForm.value;
            this.authService.signUp({
              username: formData.username,
              email: formData.email,
              password: formData.password,
              number: formData.number,
              usertype: "user",
              otp: result.message
            }).subscribe({
              next: result => {
                console.log('Register API Response:', result);
                this.registerSuccess.emit()
                this.closeBtn?.nativeElement.click();
                this.showOtpStep = false;
              }, error: (error) => {
                this.registerFailed.emit()
                this.registerForm.reset()
                this.closeBtn?.nativeElement.click();
                this.showOtpStep = false;
              }
            }); 
          } else {
            this.notificationService.showNotification(result.message, 'error');
          }
        },
        error: (error) => {
          console.log(error)
          this.notificationService.showNotification("This number or email already exists!!!", 'error');
        }
      })
    }
  }

  resendOtp(): void {
    if (this.isResendEnabled) {
      this.authService.otp({
        number: this.registerForm.value.number,
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

 
    


}

