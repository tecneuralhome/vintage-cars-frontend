import { Component } from '@angular/core';
import { FadeUpDirective } from '../fade-up.directive';

@Component({
  selector: 'app-footer',
  imports: [FadeUpDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
