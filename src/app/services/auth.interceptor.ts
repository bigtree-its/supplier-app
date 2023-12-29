import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "./jwt.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtService) {
    }
    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const skipIntercept = req.headers.has('skip');

        if (skipIntercept) {
            req = req.clone({
                headers: req.headers.delete('skip')
            });
            return next.handle(req);
        }else{
            const accessToken = this.jwtService.getAccessToken();
            if (accessToken) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization", accessToken)
                });
                return next.handle(cloned);
            }
            else {
                return next.handle(req);
            }
        }
        
    }
}