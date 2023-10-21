import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/helpers/utils';
import { AccountService } from 'src/app/services/account.service';
import { Chef, LoginResponse } from 'src/app/model/all-models';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loading: boolean = false;
  successful: boolean = false;
  password: string = '';
  error: string;
  email: string;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils,
    private accountService: AccountService,
    private profileSvc: ProfileService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.submitted = false;
    this.successful = false;
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  submit() {
    // stop here if form is invalid
    if (this.utils.isEmpty(this.email)) {
      this.error = 'Email is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.password)) {
      this.error = 'Password is mandatory';
      return;
    }
    this.submitted = true;
    // reset alerts on submit
    this.loading = true;
    this.accountService.login(this.email, this.password).subscribe(
      (res) => {
        var response: LoginResponse = res;
        console.log(response);
        if (response.success === true) {
          sessionStorage.setItem('loginSession', JSON.stringify(response));
          this.router.navigate(['home']);
          this.profileSvc.getProfile(this.email).subscribe(
            (res) =>{
              var chef:Chef = res;
              localStorage.setItem("chef", JSON.stringify(chef));
            },
            (err) =>{},
          );

        } else {
          this.error = response.message;
        }
      },
      (err) => {
        console.error('Error during login: ' + JSON.stringify(err));
        this.error =
          'Your login attempt is unsuccessful. Please try again later';
      }
    );

    // this.accountService.login(this.email, this.password)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log("Login response : "+ JSON.stringify(data))
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //       this.successful = false;
    //     });
  }

  joinUs() {
    this.router.navigate(['/register']);
  }
}
