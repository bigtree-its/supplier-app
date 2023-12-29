import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, map, retry, shareReplay, tap } from 'rxjs/operators';
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  PasswordResetInitiate,
  PasswordResetSubmit,
  RegisterRequest,
  User,
} from '../model/all-models';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { CryptoService } from './crypto.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private loginUrl: string = 'http://localhost:8081/api/auth/login';
  private logoutUrl: string = 'http://localhost:8081/api/auth/logout';
  private registerUrl: string = 'http://localhost:8081/api/users/register';
  private passwordResetInitiateUrl: string =
    'http://localhost:8081/api/users/password-reset/initiate';
  private passwordResetSubmitUrl: string =
    'http://localhost:8081/api/users/password-reset/submit';


  private storageItemUser: string = "User";

  public loginSession$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
    private jwtService: JwtService,
    private localService: LocalService,
    private readonly router: Router
  ) { }

  isAuthenticated(): boolean {
    console.log("Checking isAuthenticated")
    var s = this.jwtService.getIdToken();
    var found = (s !== null && s !== undefined && this.jwtService.validateToken(s));
    if (found) {
      var user = this.buildUser(s);
      this.loginSession$.next(user);
    } else {
      console.error('User not authenticated.')
    }
    console.log('User found in storage : ' + found)
    return found;
  }


  getCurrentUser(): User {
    var s = this.jwtService.getIdToken();
    if (s !== null && s !== undefined) {
      return this.buildUser(s);
    }
    return null;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const req: LoginRequest = {
      email: email,
      password: password,
      userType: "SUPPLIER"
    };
    console.log('Submitting login credentials to server..')
    return this.http
      .post<LoginResponse>(this.loginUrl, req, { headers: { skip: "true" } })
      .pipe(
        tap(result => {
          console.log('Login response ' + JSON.stringify(result))
          this.setUser(result);
        })
      );
  }

  register(registerReq: RegisterRequest): Observable<{ loginResp: LoginResponse }> {

    return this.http
      .post<{ loginResp: LoginResponse }>(this.registerUrl, registerReq, { headers: { skip: "true" } })
      .pipe(tap(({ loginResp }) => {
        this.setUser(loginResp);
      }));
  }

  private setUser(loginResp: LoginResponse) {
    this.jwtService.saveAccessToken(loginResp.accessToken);
    this.jwtService.saveIdToken(loginResp.idToken);
    var user: User = this.buildUser(loginResp.idToken);
    this.localService.saveData(this.storageItemUser, JSON.stringify(user));
    void this.router.navigate(["/"]);
  }

  private buildUser(token: string) {
    var tokenClaims = this.jwtService.getDecodedAccessToken(token);
    var user: User = {
      id: tokenClaims.userId,
      name: tokenClaims.firstName + " " + tokenClaims.lastName,
      email: tokenClaims.sub
    };
    return user;
  }

  public passwordResetInitiate(
    req: PasswordResetInitiate
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.passwordResetInitiateUrl, req, { headers: { skip: "true" } });
  }

  public passwordResetSubmit(
    req: PasswordResetSubmit
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.passwordResetSubmitUrl, req, { headers: { skip: "true" } });
  }

  public logout() {
    console.log('Logout...');
    var token = this.jwtService.getIdToken();
    var claims = this.jwtService.getDecodedAccessToken(token);
    this.purgeAuth();
    void this.router.navigate(["/login"]);
    const req: LogoutRequest = {
      userId: claims.userId
    };
    return this.http.post<void>(this.logoutUrl, req, { headers: { skip: "true" } });
  }

  purgeAuth(): void {
    console.log('Purgin auth...');
    this.jwtService.destroyToken();
    this.loginSession$.next(null);
    this.localService.clearData();
  }



}
