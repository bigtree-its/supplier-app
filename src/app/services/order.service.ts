import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Order, OrderProfileResponse, OrderSummary, OrderTracking } from '../model/all-models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatDate } from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  url:string = 'http://localhost:8080/api/profiles';
  storageItem: string = "orders";
  public orderSubject$: BehaviorSubject<OrderProfileResponse> = new BehaviorSubject<OrderProfileResponse>(null);

  constructor(private http: HttpClient) {}

  getOrders(email: string, period: string): Observable<Order[]> {

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    if ( period === "LastMonth"){
      date.setMonth(date.getMonth() - 1);
      m = date.getMonth();
      firstDay = new Date(y, m, 1);
    }
   
    var lastDay = new Date(y, m + 1, 0);
    var params = new HttpParams();
    if (email !== null && email !== undefined) {
      params = params.set('supplier', email);
    }
    params = params.set('dateFrom', formatDate(firstDay, 'dd/MM/yyyy', 'en-GB'));
    params = params.set('dateTo', formatDate(lastDay, 'dd/MM/yyyy', 'en-GB'));

    var url = 'http://localhost:8080/api/customer-orders/search';
    return this.http.get<Order[]>(url, {params});
  }

  getProfile(email: string, id: string): Observable<OrderProfileResponse> {

    var profileReq ={
      profileType: "Supplier",
      profileEmail: email,
      profileId: id,
    }
    console.log('getting profile for '+ JSON.stringify(profileReq))
    return this.http.post<OrderProfileResponse>(this.url, profileReq).pipe(
      tap(result => {
        localStorage.setItem(this.storageItem, JSON.stringify(result));
        this.orderSubject$.next(result);
      })
    );
  }

  getLocalOrders(): OrderProfileResponse {
    var s = localStorage.getItem(this.storageItem);
    if (s !== null && s !== undefined) {
     return JSON.parse(s);
    }
    return null;
  }

  updateStatus(tracking: OrderTracking): Observable<OrderTracking>{
    var url = 'http://localhost:8080/api/order-tracking';
    return this.http.post<OrderTracking>(url, tracking);
  }
}
