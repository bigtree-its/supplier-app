import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from '../orders/pages/orders/orders.component';
import { MenuComponent } from '../menu/pages/menu/menu.component';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  }
]


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
