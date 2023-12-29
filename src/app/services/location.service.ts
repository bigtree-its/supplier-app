import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceArea } from '../model/all-models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private URL = "http://localhost:8083";
  private BASEPATH = "/ads/v1";
  private LOCALAREA_URI = "/serviceareas";

  constructor( private http: HttpClient) { }

  fetchLocalAreas(searchText: string): Observable<ServiceArea[]> {
    var url = this.URL + this.BASEPATH + this.LOCALAREA_URI;
    var params = new HttpParams();
    if (searchText !== undefined && searchText !== null) {
      params = params.set('text', searchText);
    }
    console.log('Lookup ServiceLocations for : ' + params)
    return this.http.get<ServiceArea[]>(url, { params });
  }

  getLocation(slug: string): Observable<ServiceArea>{
    var url = this.URL + this.BASEPATH + this.LOCALAREA_URI;
    var params = new HttpParams();
    if (slug !== undefined && slug !== null) {
      params = params.set('slug', slug);
    }
    return this.http.get<ServiceArea>(url, { params });
  }
}