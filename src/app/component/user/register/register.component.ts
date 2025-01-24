import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
// import bootstrap from 'bootstrap';

@Component({
  selector: 'app-register',
  standalone: true, // Standalone component for Angular 14+ (optional)
  imports: [ReactiveFormsModule, CommonModule], // Include necessary imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  showOtpStep: boolean = false;
  isModalVisible: boolean = false;

  @ViewChild('registerModal') registerModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Bootstrap modal initialization (optional)
    // You can use this to check or manipulate modal if needed
  }

  onRegister(): void {
    console.log("showOtpStep", this.showOtpStep);

    if (this.showOtpStep) {
      this.registerForm.get('otp')?.enable();

      if (this.registerForm.valid) {
        const formData = this.registerForm.value;
        this.authService.signUp({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          number: formData.number,
          usertype: "user",
          otp: formData.otp
        }).subscribe(result => {
          console.log('Register API Response:', result);
          // this.closeModal();
          // this.removeClass()
           // Show success toaster
        this.toastr.success('Registration successful!', 'Success');
        });
      }
    } else {
      if (this.registerForm.valid) {
        this.authService.otp({
          number: this.registerForm.value.number,
          type: 'register'
        }).subscribe(result => {
          console.log('OTP API Response:', result);
          this.showOtpStep = true;
          this.registerForm.get('otp')?.enable();
        });
      }
    }
  }

  // closeModal(): void {
  //   if (this.registerModal) {
  //     const modalElement = this.registerModal.nativeElement;
  //     const modalInstance = bootstrap.Modal.getInstance(modalElement); 
  //     if (modalInstance) {
  //       modalInstance.hide(); 
  //     }
  //   }
  // }

  removeClass() {
    // const modal = document.getElementById('registerModal');
    // if (modal) {
    //   this.renderer.removeClass(modal, 'show');
    //   this.renderer.setStyle(modal, 'display', 'none'); 
    //   this.renderer.removeAttribute(modal, 'role'); 
    // }

    // const body = document.body;
    // this.renderer.removeClass(body, 'modal-open');
    // this.renderer.removeStyle(body, 'overflow'); 
    // this.renderer.removeStyle(body, 'padding-right'); 
    // this.renderer.removeAttribute(body, 'data-bs-overflow');
    // this.renderer.removeAttribute(body, 'data-bs-padding-right'); 

    // const backdrops = document.querySelectorAll('.modal-backdrop.fade.show');
    // backdrops.forEach((backdrop) => {
    //   this.renderer.removeClass(backdrop, 'show'); // Remove the 'show' class
    // });
  
  }
}
