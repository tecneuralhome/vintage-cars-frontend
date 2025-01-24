import { Component } from '@angular/core';
import { FadeUpDirective } from '../fade-up.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio-collections',
  imports: [FadeUpDirective, CommonModule],
  templateUrl: './portfolio-collections.component.html',
  styleUrl: './portfolio-collections.component.css'
})
export class PortfolioCollectionsComponent {
  products = [
    {
      image: 'assets/DSC01592.png',
      name: 'Plymouth Belvedere- 1955 Turquoise Blue',
    },
    {
      image: 'assets/8e9933bd-3fa4-432a-a4b5-2adc80e9de1b (1).png',
      name: 'Hindustan Ambassador Mark 1 - 1959 - Black',
    },
    {
      image: 'assets/DSC01381.png',
      name: 'Hindustan Contessa Classic - Crystal white - 1995',
    },
    {
      image: 'assets/IMG_3733.png',
      name: 'Ford GPW - 1942 - olive Green',
    },
    {
      image: 'assets/fbd592a9-92cb-4641-a403-e5a499ac4863.png',
      name: 'Mercedes benz - 1962 - present blue',
    },
    {
      image: 'assets/image.png',
      name: 'Maruti 800',
    },
  ];
}
