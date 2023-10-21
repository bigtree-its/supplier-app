import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../model/all-models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSvcUrl: string = 'http://localhost:8083/ads/v1/menus';

  constructor(private http: HttpClient) {}

  getMenus(chefEmail: string): Observable<Menu[]> {
    var params = new HttpParams();
    if (chefEmail !== undefined && chefEmail !== null) {
      params = params.set('email', chefEmail);
    }
    return this.http.get<Menu[]>(this.menuSvcUrl, { params });
  }

  createNewFood(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.menuSvcUrl, menu);
  }

  updateFood(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(this.menuSvcUrl, menu);
  }

  deleteFood(menu: Menu): Observable<any> {
    var url = this.menuSvcUrl + '/' + menu._id;
    return this.http.delete<any>(url);
  }
}
