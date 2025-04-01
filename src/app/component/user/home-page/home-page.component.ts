import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioCollectionsComponent } from '../portfolio-collections/portfolio-collections.component';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { FadeUpDirective } from '../fade-up.directive';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../services/car.service';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-page',
  imports: [PortfolioCollectionsComponent, BookingFormComponent, FadeUpDirective, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;
  currentIndex = 0;
  intervalId: any;
  slides: any[] = []; 

  private subscription!: Subscription;

  constructor(private carService: CarService, private sharedService: SharedService){}

  ngOnInit() {
    this.subscription = this.sharedService.collectionClicked$.subscribe(() => {
      this.handleCollectionClick();
    });
    this.fetchSlider()
    this.startSlider();
  }

  handleCollectionClick() {
    console.log('Collections link clicked!');
    const bookingForm = document.getElementById('collections');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Booking form element not found.');
    }
  }

  startSlider() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000); // Switch every 5 seconds
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

  isImage(media: string): boolean {
    if (!media) return false;
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const extension = media.split('.').pop()?.toLowerCase();
    return imageExtensions.includes(extension || "");
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
