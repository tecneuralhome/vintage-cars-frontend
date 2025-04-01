import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, HeaderComponent, FooterComponent,AdminHeaderComponent, ProductDetailComponent, FadeUpDirective,CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  title = 'auth-app-angular';
  user_panel: boolean = true

  constructor(private router:Router) {}
  ngOnInit(): void {
    const user = localStorage.getItem('usertype')
    if(user === 'admin'){
      this.user_panel = false;
      this.router.navigate(['/cars-list']);
    }
  }


  toggleMenu(type: string) {
    if(type === "sign-in") this.router.navigate(['/login']);
    if(type === "sign-up") this.router.navigate(['/register']);
  }


 

  getLoginType(){
    this.user_panel = !this.user_panel
    this.router.navigate(['/cars-list']);
  }

  adminOff(){
    this.user_panel = true;
    localStorage.removeItem('authToken');
    localStorage.removeItem('usertype');
    this.router.navigate(['/Home-page']);
  }
}
