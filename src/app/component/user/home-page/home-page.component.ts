import { Component } from '@angular/core';
import { PortfolioCollectionsComponent } from '../portfolio-collections/portfolio-collections.component';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { FadeUpDirective } from '../fade-up.directive';

@Component({
  selector: 'app-home-page',
  imports: [PortfolioCollectionsComponent, BookingFormComponent, FadeUpDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
