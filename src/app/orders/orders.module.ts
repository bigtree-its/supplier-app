import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './pages/orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './pages/item/item.component';

const routes: Routes = [{ path: 'orders', component: OrdersComponent }];

@NgModule({
  declarations: [OrdersComponent, ItemComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class OrdersModule {}
