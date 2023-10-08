import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  PasswordResetInitiate,
  PasswordResetSubmit,
  RegisterRequest,
} from '../model/all-models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private loginUrl: string = 'http://localhost:8081/api/users/login';
  private logoutUrl: string = 'http://localhost:8081/api/users/logout';
  private registerUrl: string = 'http://localhost:8081/api/users/register';
  private passwordResetInitiateUrl: string =
    'http://localhost:8081/api/users/password-reset/initiate';
  private passwordResetSubmitUrl: string =
    'http://localhost:8081/api/users/password-reset/submit';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<LoginResponse> {
    const req: LoginRequest = {
      email: email,
      password: password,
      userType: "SUPPLIER"
    };
    return this.http.post<LoginResponse>(this.loginUrl, req);
  }

  public passwordResetInitiate(
    req: PasswordResetInitiate
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.passwordResetInitiateUrl, req);
  }

  public passwordResetSubmit(
    req: PasswordResetSubmit
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.passwordResetSubmitUrl, req);
  }

  public logout(userId: string, sessionId: string) {
    const req: LogoutRequest = {
      userId: userId,
      sessionId: sessionId,
    };
    return this.http.post<void>(this.logoutUrl, req);
  }

  public register(registerReq: RegisterRequest): Observable<any> {
    return this.http.post<any>(this.registerUrl, registerReq);
  }
}
