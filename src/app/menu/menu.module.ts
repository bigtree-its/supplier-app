import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './pages/menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiMenuComponent } from './pages/li-menu/li-menu.component';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { 
    path: 'menus', 
    component: MenuComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  declarations: [
    MenuComponent,
    LiMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class MenuModule { }
