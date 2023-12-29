import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/pages/home/home.component';
import { OrdersComponent } from '../orders/pages/orders/orders.component';
import { MenuComponent } from '../menu/pages/menu/menu.component';
import { ProfileComponent } from '../profile/pages/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'menus', component: MenuComponent },
  { path: 'profile', component: ProfileComponent },
]


@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    HeaderComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
