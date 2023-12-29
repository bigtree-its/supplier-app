import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './pages/orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './pages/item/item.component';
import { ViewOrderComponent } from './pages/view.order/view.order.component';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { 
    path: 'orders', 
    component: OrdersComponent ,
    canActivate:[AuthGuard]
  },
  {
    path: 'orders/:id', 
    component: ViewOrderComponent,
    canActivate:[AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  },
];

@NgModule({
  declarations: [OrdersComponent, ItemComponent, ViewOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class OrdersModule { }
