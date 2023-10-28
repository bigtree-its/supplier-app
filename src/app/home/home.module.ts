import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from '../orders/pages/orders/orders.component';
import { MenuComponent } from '../menu/pages/menu/menu.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'menus', component: MenuComponent },
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
