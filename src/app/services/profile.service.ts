import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chef, Cuisine, ServiceArea, Supplier } from '../model/all-models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private profileUrl: string = 'http://localhost:8083/ads/v1/chefs';
  private serviceAreaUrl: string = 'http://localhost:8083/ads/v1/serviceareas';
  private cuisinesUrl: string = 'http://localhost:8083/ads/v1/cuisines';

  constructor(private http: HttpClient) {}

  getProfile(chefEmail: string): Observable<Chef> {
    var params = new HttpParams();
    if (chefEmail !== undefined && chefEmail !== null) {
      params = params.set('email', chefEmail);
    }
    return this.http.get<Chef>(this.profileUrl, { params });
  }


  fetchAllServiceAreas(city: string): Observable<ServiceArea[]> {
    var params = new HttpParams();
    if (city !== undefined && city !== null) {
      params = params.set('city', city);
    }
    return this.http.get<ServiceArea[]>(this.serviceAreaUrl, { params });
  }

  fetchAllCuisine(): Observable<Cuisine[]> {
    return this.http.get<Cuisine[]>(this.cuisinesUrl);
  }

  getCuisineById(id: string): Observable<Cuisine> {
    return this.http.get<Cuisine>(this.cuisinesUrl+"/"+ id);
  }

  createNewChef(chef: Chef): Observable<Chef> {
    return this.http.post<Chef>(this.profileUrl, chef);
  }
}
