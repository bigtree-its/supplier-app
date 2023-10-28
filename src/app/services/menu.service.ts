import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chef, Collection, Menu } from '../model/all-models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  
  
  private menuSvcUrl: string = 'http://localhost:8083/ads/v1/menus';
  private collectionsUrl: string = 'http://localhost:8083/ads/v1/collections';

  constructor(private http: HttpClient) {}

  getMenus(chefEmail: string): Observable<Menu[]> {
    var params = new HttpParams();
    if (chefEmail !== undefined && chefEmail !== null) {
      params = params.set('email', chefEmail);
    }
    return this.http.get<Menu[]>(this.menuSvcUrl, { params });
  }

  getCollections(chefId: string): Observable<Collection[]> {
    var params = new HttpParams();
    if (chefId !== undefined && chefId !== null) {
      params = params.set('chef', chefId);
    }
    return this.http.get<Collection[]>(this.collectionsUrl, { params });
  }

  createNewFood(menu: any): Observable<Menu> {
    return this.http.post<Menu>(this.menuSvcUrl, menu);
  }

  updateMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(this.menuSvcUrl+"/"+ menu._id, menu);
  }

  saveCollection(collectionName: string, chef: string): Observable<Collection> {
    var collection: Collection = {
      name: collectionName,
      chefId: chef,
      slug: undefined,
      image: undefined,
      _id: undefined,
    }
    window.alert('Saving for chef:' + JSON.stringify(chef))
    window.alert('Saving collection:' + JSON.stringify(collection))
    return this.http.post<Collection>(this.collectionsUrl, collection);
  }

  updateFood(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(this.menuSvcUrl, menu);
  }

  deleteFood(menu: Menu): Observable<any> {
    var url = this.menuSvcUrl + '/' + menu._id;
    return this.http.delete<any>(url);
  }

  deleteCollection(collection: Collection): Observable<any> {
    var url = this.collectionsUrl + '/' + collection._id;
    return this.http.delete<any>(url);
  }
}
