import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './pages/menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [{ path: 'foods', component: MenuComponent }];

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule.forChild(routes),
  ]
})
export class MenuModule { }
