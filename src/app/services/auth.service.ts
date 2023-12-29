import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
  })
export class AuthService {


    private authenticated = false;
    private authSecretKey = 'Token';

    constructor( private router: Router
    ) {
        this.authenticated = !!localStorage.getItem(this.authSecretKey);
    }

    public isAuthenticated(): boolean {

        const token = localStorage.getItem(this.authSecretKey);
        this.authenticated = !!token;
        // Check whether the token is expired and return
        // true or false
        return this.authenticated;//!this.jwtHelper.isTokenExpired(token);
    }

    setToken(token: string) {
        localStorage.setItem(this.authSecretKey, token)
    }

    destroyToken() {
        localStorage.removeItem(this.authSecretKey);
    }

    login() {
        void this.router.navigate(["/"]);
    }
}