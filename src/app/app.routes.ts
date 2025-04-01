import { Routes } from '@angular/router';
import { HomePageComponent } from './component/user/home-page/home-page.component';
import { ProductDetailComponent } from './component/user/product-detail/product-detail.component';
import { AddCarsComponent } from './component/admin/add-cars/add-cars.component';
import { AdminNotificationComponent } from './component/admin/admin-notification/admin-notification.component';
import { AppUsersComponent } from './component/admin/app-users/app-users.component';
import { CarsListComponent } from './component/admin/cars-list/cars-list.component';
import { AddSliderComponent } from './component/admin/add-slider/add-slider.component';
import { UserProfileComponent } from './component/user/user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';

export const routes: Routes = [
  // Public Routes
  { path: '', component: HomePageComponent },
  { path: 'Home-page', component: HomePageComponent},
  { path: 'detail-page', component: ProductDetailComponent},

  // Protected User Routes
  
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },

  // Admin Routes (Protected by RoleGuard)
  { path: 'add-cars', component: AddCarsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'booking-managements', component: AdminNotificationComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'user-list', component: AppUsersComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'cars-list', component: CarsListComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },
  { path: 'add-slider-content', component: AddSliderComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } }
];
