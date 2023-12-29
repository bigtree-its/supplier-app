import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '../services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { 
    path: 'profile', 
    component: ProfileComponent ,
    canActivate:[AuthGuard]
  }
]
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
