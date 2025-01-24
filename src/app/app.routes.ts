import { Routes } from '@angular/router';
import { LoginComponent } from './component/authentication/login/login.component';
import { RegisterComponent } from './component/authentication/register/register.component';
import { HomePageComponent } from './component/user/home-page/home-page.component';
import { ProductDetailComponent } from './component/user/product-detail/product-detail.component';
import { AddCarsComponent } from './component/admin/add-cars/add-cars.component';
import { Component } from '@angular/core';
import { NotificationsComponent } from './component/admin/notifications/notifications.component';


export const routes: Routes = [
  {path: '', component: HomePageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail-page', component: ProductDetailComponent},
  {path:'add-cars', component:AddCarsComponent},
  {path: 'notifications', component:NotificationsComponent}
];