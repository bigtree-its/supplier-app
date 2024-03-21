import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalService } from "./local.service";

@Injectable({ providedIn: "root" })
export class JwtService {

  private accessToken: string = "accessToken"
  jwtHelper = new JwtHelperService();

  constructor(private localService: LocalService) { }

  getAccessToken(): string {
    return this.localService.getData(this.accessToken);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  saveAccessToken(token: string): void {
    this.localService.saveData(this.accessToken, token)
  }

  destroyToken(): void {
    this.localService.removeData(this.accessToken)
  }

  validateToken(token) {
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return false;
    } else {
      return true;
    }
  }
}