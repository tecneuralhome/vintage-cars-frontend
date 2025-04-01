import { Component, ElementRef, ViewChild } from '@angular/core';
import { Carousel } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { PortfolioCollectionsComponent } from '../portfolio-collections/portfolio-collections.component';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { FadeUpDirective } from '../fade-up.directive';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, PortfolioCollectionsComponent, BookingFormComponent, FadeUpDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  apiUrl = environment.apiUrl;
  selectedImage: string = '';
  car: any[] = [];
  // images = [
  //   { src: '../../../../assets/banner.png', alt: 'Image 1' },
  //   { src: '../../../../assets/banner.png', alt: 'Image 2' },
  //   { src: '../../../../assets/banner.png', alt: 'Image 3' },
  //   { src: '../../../../assets/banner.png', alt: 'Image 4' },
  // ];

  activeIndex = 0;
  images: string[] = [];
  videos: string[] = [];

  selectedMedia: string = ""; // Holds the selected image/video URL
  selectedMediaType: "image" | "video" = "image"; // Tracks media type

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Received state data: ===== ', params['id']);
      if (params['id']) {
        console.log("id true======-------------", params['id'])
        this.getCarDetails(params['id']);
      } else {
        console.error('ID not found in the route');
      }
    });
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  
  }

  getCarDetails(id: string): void {
    console.log("getCarDetails++++++++++")
    this.carService.getCarById(id).subscribe({
      next: (data) => {
        this.car = data.cars;
        console.log(data, "car-----------detail")

        // if (this.car?.length && this.car[0].image?.length) {
        //   this.selectedImage = 'http://54.160.212.90:8080/' + (this.car[0].image[0] || '/default-image.jpg');
        // }

        if (this.car?.length && this.car[0].image?.length) {
          const firstMedia = this.car[0].image[0]; // Get the first media item
          const fileExtension = firstMedia.split('.').pop()?.toLowerCase();
  
          if (fileExtension && ["jpeg", "jpg", "png", "gif"].includes(fileExtension)) {
            this.selectedMediaType = "image";
          } else if (fileExtension && ["mp4", "mov", "avi", "mkv"].includes(fileExtension)) {
            this.selectedMediaType = "video";
          } else {
            this.selectedMediaType = "image"; // Default to image if unknown
          }
  
          this.selectedMedia = this.apiUrl + firstMedia;
        }

        this.filterMedia();
      },
      error: (error) => {
        console.error('Error fetching car details:', error);
      },
    });
  }

  goToSlide(index: number) {
    this.activeIndex = index;

    // const carouselElement = document.getElementById('carouselExample');
    // if (carouselElement) {
    //   const bootstrapCarousel = new Carousel(carouselElement);
    //   bootstrapCarousel.to(index);
    // }
  }

  // selectImage(image: string, index: number) {
  //   this.activeIndex = index;
  //   console.log(image, "image==========")
  //   this.selectedImage = 'http://54.160.212.90:8080/' + (image || '/default-image.jpg');
  //   console.log(this.selectedImage, "selectedImage==========")
  // }

  selectImage(media: string, index: number) {
    this.activeIndex = index;
    const fileExtension = media.split('.').pop()?.toLowerCase();
  
    if (fileExtension && ["jpeg", "jpg", "png", "gif"].includes(fileExtension)) {
      this.selectedMediaType = "image";
    } else if (fileExtension && ["mp4", "mov", "avi", "mkv"].includes(fileExtension)) {
      this.selectedMediaType = "video";
    }
  
    this.selectedMedia = this.apiUrl + media;
    console.log(this.selectedMedia, this.selectedMediaType);
  }

  filterMedia() {
    if (this.car && this.car.length > 0 && this.car[0].image) {
      this.images = this.car[0].image.filter((img: string) =>
        img.match(/\.(jpeg|jpg|png|gif)$/i)
      );
      this.videos = this.car[0].image.filter((vid: string) =>
        vid.match(/\.(mp4|mov|avi|mkv)$/i)
      );
    } else {
      console.error("Car data is missing or undefined");
    }
  }


  scrollToBookingForm() {
    const bookingForm = document.getElementById('inquireForm');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Booking form element not found.');
    }
  }


}
