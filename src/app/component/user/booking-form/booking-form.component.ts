import { Component } from '@angular/core';
import { FadeUpDirective } from '../fade-up.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  imports: [FadeUpDirective, ReactiveFormsModule, CommonModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      eventDate: ['', Validators.required],
      venue: ['', Validators.required],
      locationPreference: ['', Validators.required],
      carSelection: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log('Form Submitted:', this.bookingForm.value);
    } else {
      console.log('Form is invalid.');
      this.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    Object.values(this.bookingForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

}
