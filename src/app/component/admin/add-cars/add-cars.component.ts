import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { CarService } from "../../../services/car.service";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NotificationComponent } from '../../user/notification/notification.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-add-cars',
  imports: [ReactiveFormsModule, RouterOutlet, NotificationComponent],
  templateUrl: './add-cars.component.html',
  styleUrl: './add-cars.component.css'
})
export class AddCarsComponent {
  productForm: FormGroup;
  sliderForm: FormGroup;
  selectedImage: File[] | null = null;
  selectedImageSliderForm: File | null = null;

  constructor(private fb: FormBuilder, private carService: CarService, private router:Router, private notificationService: NotificationService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      color: ['', Validators.required],
      brand: ['', Validators.required],
      about_car: ['', Validators.required],
      status: [1, Validators.required]
    });
    this.sliderForm = this.fb.group({
      position: ['', Validators.required],
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = Array.from(input.files);
    }
  }
  onFileSelectSliderForm(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageSliderForm = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('model', this.productForm.get('model')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('color', this.productForm.get('color')?.value);
      formData.append('brand', this.productForm.get('brand')?.value);
      formData.append('about_car', this.productForm.get('about_car')?.value);
      formData.append('status', this.productForm.get('status')?.value);
      
      if (this.selectedImage) {
        this.selectedImage.forEach((file) => {
          formData.append('images', file, file.name);
        });
      }
      this.carService.registerCarInfo(formData).subscribe((result:any) =>{
        console.log("===== REGISTER CAR INFO API RESULT =====", result)
        this.productForm.reset()
      })

      // Example: Submit formData to the backend
      console.log('Form Submitted:', formData);
      this.notificationService.showNotification('New Car Added!', 'success');
      setTimeout(() => {
        this.router.navigate(['/cars-list']);
      }, 3000);
    }
  }
  onSubmitSliderForm(): void {
    if (this.sliderForm.valid && this.selectedImageSliderForm) {
      const formData = new FormData();
      formData.append('position', this.sliderForm.get('position')?.value);
      formData.append('images', this.selectedImageSliderForm);
      this.carService.registerSliderInfo(formData).subscribe((result:any) =>{
        console.log("===== REGISTER SLIDER INFO API RESULT =====", result)
      })
    }
  }
}
