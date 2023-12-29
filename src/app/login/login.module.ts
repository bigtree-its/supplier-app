import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import { faCoffee, faUser, fas,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ResetInitiateComponent } from './pages/reset-initiate/reset-initiate.component';
import { ResetSubmitComponent } from './pages/reset-submit/reset-submit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password_reset/new', component: ResetInitiateComponent },
  { path: 'password_reset/submit', component: ResetSubmitComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetInitiateComponent,
    ResetSubmitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
    library.addIcons(faUser);
    library.addIcons(faEnvelope);
  }
 }
