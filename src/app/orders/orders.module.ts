import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './pages/orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './pages/item/item.component';

const routes: Routes = [{ path: 'orders', component: OrdersComponent }];

@NgModule({
  declarations: [OrdersComponent, ItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class OrdersModule {}
