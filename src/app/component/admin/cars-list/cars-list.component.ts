import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../services/car.service';
import { environment } from '../../../../environments/environment';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';
import { NotificationComponent } from '../../user/notification/notification.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-car-list',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule, NotificationComponent],
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  cars: any[] = [];
  filteredCars: any[] = []; // Filtered list for displaying results
  searchTerm: string = ''; // Stores user input for searching
  totalCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  imagePreview: string | null = null;

  selectedImage: File[] | null = null;

  selectedCar: any = null; 
  editForm!: FormGroup;

  constructor(private carservice: CarService, private fb: FormBuilder,private notificationService: NotificationService) {
    this.editForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      color: ['', Validators.required],
      brand: ['', Validators.required],
      about_car: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCarList();
  }

  fetchCarList(): void {
    const params = {
      page: this.currentPage.toString(),
      limit: this.itemsPerPage.toString()
    };

    this.carservice.getCars(params).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.cars = response.cars;
          this.filteredCars = [...this.cars]; 
          this.totalCount = response.totalCount;
        }
      },
      error: (error) => {
        console.error('Error fetching cars:', error);
      }
    });
  }


  filterCars(): void {
    if (!this.searchTerm) {
      this.filteredCars = [...this.cars]; // Reset if search is empty
    } else {
      const lowerCaseSearch = this.searchTerm.toLowerCase();
      this.filteredCars = this.cars.filter((car) =>
        car.name.toLowerCase().includes(lowerCaseSearch) ||
        car.model.toLowerCase().includes(lowerCaseSearch) ||
        car.price.toString().includes(lowerCaseSearch) ||
        car.brand.toLowerCase().includes(lowerCaseSearch) ||
        car.color.toLowerCase().includes(lowerCaseSearch)
      );
    }
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Prevent invalid page numbers
    }
    this.currentPage = page;
    this.fetchCarList();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }
  
  onEdit(car: any): void {
    console.log('Edit car:', car);
    if (car) {
      this.selectedCar = car;
      console.log('Selected Car Images:', this.selectedCar?.image);
      console.log('Selected Car :', this.selectedCar);
      this.imagePreview = this.apiUrl + car.image[0];
      this.editForm!.patchValue({ 
        id: car.id,
        name: car.name,
        model: car.model,
        price: car.price,
        color: car.color,
        brand: car.brand,
        about_car: car.pagecontent,
        image: car.image[0],
        status: car.status ? '1' : '0'
       }); // Non-null assertion for editForm
    } else {
      console.error('Selected user is undefined.');
    }
  }

  isImage(file: string): boolean {
    console.log(file, "image-----file")
    if (!file) return false;
    console.log(file.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null, "image----return-file")
    return file.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
    
  }
  
  isVideo(file: string): boolean {
    console.log(file, "vdo-----file")
    if (!file) return false;
    return file.includes("mov") || file.includes("mp4") || file.includes("webm") || file.includes("ogg")
  }
  

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value; // Only contains id and username
      console.log(updatedData, "carlist======data")
      const formData = new FormData();
      formData.append('name', this.editForm.get('name')?.value);
      formData.append('model', this.editForm.get('model')?.value);
      formData.append('price', this.editForm.get('price')?.value);
      formData.append('color', this.editForm.get('color')?.value);
      formData.append('brand', this.editForm.get('brand')?.value);
      formData.append('about_car', this.editForm.get('about_car')?.value)
      formData.append('id', this.editForm.get('id')?.value)
      formData.append('status', this.editForm.get('status')?.value);
      
      if (this.selectedImage) {
        this.selectedImage.forEach((file) => {
          formData.append('images', file, file.name);
        });
      }
      console.log(formData, "formData======")
      this.carservice.updateCars(formData).subscribe({
        next: (response) => {
          this.editForm.reset(); // Clear the form after update
          this.selectedCar = null; // Clear the selected user
          this.fetchCarList();
          this.notificationService.showNotification('Car data updated!', 'success');
        },
        error: (err) => {
          this.notificationService.showNotification('something went wrong!', 'error');
        },
      });
    } else {
      
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = Array.from(input.files);
    }
  }

  onDelete(carId: string): void {
    console.log(carId,"carid===========")
    if (confirm('Are you sure you want to delete this car?')) {
     this.carservice.deleteCar({id: carId}).subscribe({
      next: (response) => {
        console.log(response,"delete response")
        this.fetchCarList();
        this.notificationService.showNotification('Car delete successful', 'success');
      },
      error: (err) =>{
        console.log(err, "err delete")
        this.notificationService.showNotification('something went wrong!', 'error');
      }
      
     })
      
    }
  }
    deleteCarInfoImage(imagePath: string, id: any): void {
    console.log("===== IMAGE PATH =====", imagePath)

     if( this.selectedCar.image.length > 1){
     
      this.carservice.deleteCarImage({imagePath: imagePath, id: id}).subscribe({
        next: (response) => {
          console.log(response,"delete response")
          this.notificationService.showNotification('Image delete successful', 'success');
          this.fetchCarList()
        },
        error: (err) =>{
          console.log(err, "err delete")
          this.notificationService.showNotification('something went wrong!', 'error');
        }
        
       })
    } else {
      this.notificationService.showNotification('Min 1 Image is Required', 'error');
    }

 
     
  }
}
