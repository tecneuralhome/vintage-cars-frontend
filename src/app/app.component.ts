import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/authentication/login/login.component';
import { RegisterComponent } from './component/authentication/register/register.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from './component/user/header/header.component';
import { FooterComponent } from './component/user/footer/footer.component';
import { AdminHeaderComponent } from './component/admin/admin-header/admin-header.component';
import { ProductDetailComponent } from './component/user/product-detail/product-detail.component';
import { FadeUpDirective } from './component/user/fade-up.directive';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, HeaderComponent, FooterComponent,AdminHeaderComponent, ProductDetailComponent, FadeUpDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auth-app-angular';
  constructor(private router:Router) {}

  toggleMenu(type: string) {
    if(type === "sign-in") this.router.navigate(['/login']);
    if(type === "sign-up") this.router.navigate(['/register']);
  }
}
