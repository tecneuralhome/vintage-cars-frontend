import { Component, OnInit } from '@angular/core';
import { FadeUpDirective } from '../fade-up.directive';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../services/car.service';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-portfolio-collections',
  imports: [FadeUpDirective, CommonModule, RouterModule ],
  templateUrl: './portfolio-collections.component.html',
  styleUrl: './portfolio-collections.component.css'
})
export class PortfolioCollectionsComponent implements OnInit {
  apiUrl = environment.apiUrl;
  constructor(private carService: CarService, private router: Router
   
  ) {}


  products: any[] = []; // To store fetched products

  ngOnInit(): void {
    this.fetchCars();
  }


  fetchCars(): void {
    const params = {
      page: 1,
      limit: 10,
    };

    this.carService.getCars(params).subscribe({
      next: (data) => {
        console.log("data cars",data)
        this.products = data.cars; 
        console.log(this.products)
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
  
  goToDetailPage(id: any) {
    console.log('Product Detail page clicked:', id);
    const stateData = { id: id }; // Example state data
    this.router.navigate(['/detail-page'], { queryParams: stateData });
    // this.router.navigate(['/detail-page'], { state: stateData });
  }
}
