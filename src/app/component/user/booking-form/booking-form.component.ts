import { Component, OnInit } from '@angular/core';
import { FadeUpDirective } from '../fade-up.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl , ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { CarService } from '../../../services/car.service';
import { NotificationService } from '../../../services/notification.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-booking-form',
  imports: [FadeUpDirective, ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  isLoading: boolean = false;
  isConform: boolean = false;

  constructor(private fb: FormBuilder, private bookingService: BookingService, private carService: CarService, private notificationService: NotificationService) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      eventDate: ['', [Validators.required, this.minDateValidator(new Date())]],
      venue: ['', Validators.required],
      locationPreference: ['', Validators.required],
      carSelection: ['', Validators.required],
    });
  }

  minDateValidator(minDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // No validation error if there's no value
      }
      const inputDate = new Date(control.value);
      if (inputDate < minDate) {
        return { minDate: { requiredDate: minDate, actualDate: inputDate } };
      }
      return null; // Valid date
    };
  }

  carNames: any[] = [];
  ngOnInit(): void {
    this.fetchCars();
  }

  conformBooking() {
    this.isConform = true
  }

  bookingCancel() {
    this.bookingForm.reset(); 
    this.isConform = false
  }

  onSubmit() {
    this.isConform = false
    this.isLoading = true;
    console.log("this.bookingForm.get('carSelection')?.value", this.bookingForm.get('carSelection')?.value)
    if (this.bookingForm.valid) {
      const params = {
        name: this.bookingForm.get('name')?.value,
        email: this.bookingForm.get('email')?.value,
        number: this.bookingForm.get('phone')?.value,
        eventdate: this.bookingForm.get('eventDate')?.value,
        from: this.bookingForm.get('venue')?.value,
        to: this.bookingForm.get('locationPreference')?.value,
        carname: this.bookingForm.get('carSelection')?.value,
      }
      console.log("===== PARAMS =====", params);
      this.bookingService.booking(params).subscribe({next: (result) => {
        console.log('Booking Result:', result);  
        this.bookingForm.reset();   
        this.notificationService.showNotification('Booking successful!', 'success');
        this.isLoading = false;
      }, error: (error) => {
        console.error('Booking failed:', error);
        this.notificationService.showNotification('Please Login before Booking!', 'error');
        this.isLoading = false;
      }
    });
    } else {
      console.log('Form is invalid.');
      this.markAllAsTouched();
      this.isLoading = false;
    }
  }

  markAllAsTouched() {
    Object.values(this.bookingForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  fetchCars(): void {
    this.carService.getCars({}).subscribe({
      next: (data) => {
        let names = []
        for (let i = 0; i < data.cars.length; i++) {
          names.push({
            name: data.cars[i].name,
          })
        }
        this.carNames = names;
      },
      error: (error) => {
        console.error('Error fetching cars:', error);
      },
    });
  }

  get f() {
    return this.bookingForm.controls;
  }


}
