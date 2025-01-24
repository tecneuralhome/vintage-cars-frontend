import { Component,ElementRef, ViewChild } from '@angular/core';
import { Carousel } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { PortfolioCollectionsComponent } from '../portfolio-collections/portfolio-collections.component';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { FadeUpDirective } from '../fade-up.directive';


@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, PortfolioCollectionsComponent,BookingFormComponent,FadeUpDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {


  images = [
    { src: '../../../../assets/banner.png', alt: 'Image 1' },
    { src: '../../../../assets/banner.png', alt: 'Image 2' },
    { src: '../../../../assets/banner.png', alt: 'Image 3' },
    { src: '../../../../assets/banner.png', alt: 'Image 4' },
  ];

  activeIndex = 0;

  goToSlide(index: number) {
    this.activeIndex = index;
  
    // const carouselElement = document.getElementById('carouselExample');
    // if (carouselElement) {
    //   const bootstrapCarousel = new Carousel(carouselElement);
    //   bootstrapCarousel.to(index);
    // }
  }

  scrollToBookingForm() {
    // const bookingForm = document.getElementById('inquireForm');
    // if (bookingForm) {
    //   bookingForm.scrollIntoView({ behavior: 'smooth' });
    // } else {
    //   console.error('Booking form element not found.');
    // }
  }
}
