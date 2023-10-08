import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderSummary, OrderTracking } from '../model/all-models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatDate } from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class OrderService {

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

  updateStatus(tracking: OrderTracking): Observable<OrderTracking>{
    var url = 'http://localhost:8080/api/order-tracking';
    return this.http.post<OrderTracking>(url, tracking);
  }
}
