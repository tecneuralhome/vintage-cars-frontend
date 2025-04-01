import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { CarService } from "../../../services/car.service";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../user/notification/notification.component';
import { NotificationService } from '../../../services/notification.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-slider',
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule, NotificationComponent],
  templateUrl: './add-slider.component.html',
  styleUrl: './add-slider.component.css'
})
export class AddSliderComponent implements OnInit {
    apiUrl = environment.apiUrl;
  sliderForm!: FormGroup;
  selectedImageSliderForm: File | null = null;
  dltPopup : boolean = false;
  slides: any[] = []; 


  constructor(private fb: FormBuilder, private carService: CarService, private router:Router,
    private notificationService: NotificationService
  ){
    this.sliderForm = this.fb.group({
      position: ['', Validators.required],
    });
  }
  

  ngOnInit(): void {
    this.fetchSlider()
    console.log(this.apiUrl, "===========apiurl")
  }

  onFileSelectSliderForm(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageSliderForm = input.files[0];
    }
  }

  onSubmitSliderForm(): void {
    if (this.sliderForm.valid && this.selectedImageSliderForm) {
      const formData = new FormData();
      formData.append('position', this.sliderForm.get('position')?.value);
      formData.append('images', this.selectedImageSliderForm);
      this.carService.registerSliderInfo(formData).subscribe({
        next : (result) => {
          console.log(result, "added slider------")
          this.dltPopup = false
          this.sliderForm.reset();
          this.notificationService.showNotification('Slide Added!', 'success');
          this.fetchSlider()
        },
          error: (error) => {
            console.log(error)
           this.dltPopup = true
          }
      })
    }
  }

  fetchSlider(): void {
    this.carService.getSlider().subscribe({
      next: (data) => {
        console.log("data slide",data.slides)
        this.slides = data.slides
       
      },
      error: (error) => {
        console.error('Error fetching cars:', error);
      },
    });
  }

  deleteSlide(){
    const position = this.sliderForm.get('position')?.value
    console.log(position, "position------")
    this.carService.deleteSlider({position: position}).subscribe({
      next : (result) => {
        console.log(result,"delete result")
        this.onSubmitSliderForm()
      }
    })
  }

  deleteSlideFromtable(position : any){
    if (confirm('Are you sure you want to delete this Banner?')) {
    this.carService.deleteSlider({position: position}).subscribe({
      next : (result) => {
        console.log(result,"delete result")
        this.fetchSlider()
        this.notificationService.showNotification('Delete successfully!', 'success');
      }
    })
  }
  }

  getImageType(file: string): 'image' | 'video' | 'unknown' {
    if (!file) return 'unknown';
    if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return 'image';
    if (file.match(/\.(mov|mp4|webm|ogg)$/i)) return 'video';
    return 'unknown';
  }

  cancel(){
    this.dltPopup = false;
    console.log("cancel-----")
  }
}

