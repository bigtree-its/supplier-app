import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Chef, Cuisine, ServiceArea, Slot, Supplier, User } from '../model/all-models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AccountService } from './account.service';
import { LocalService } from './local.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  
  private profileUrl: string = 'http://localhost:8083/ads/v1/chefs';
  private serviceAreaUrl: string = 'http://localhost:8083/ads/v1/serviceareas';
  private cuisinesUrl: string = 'http://localhost:8083/ads/v1/cuisines';
  private slotsUrl: string = 'http://localhost:8083/ads/v1/slots';

  public chef$ = new BehaviorSubject<Chef>(null);
  private storageItem = "chef";

  constructor(private http: HttpClient, 
    private authSvc: AccountService,
    private localService: LocalService
    ) {
  }

  purgeChef(){
    console.log('Purging chef.');
    this.localService.removeData(this.storageItem);
    this.chef$.next(null);
  }

  getChef(): Observable<Chef> {

    var user = this.authSvc.getCurrentUser();
    if (user != null && user !== undefined){
      return this.fetchChef(user.email);
    }
    return null;
  }

  private fetchChef(email: string) {
    var params = new HttpParams();
    params = params.set('email', email);
    return this.http.get<Chef>(this.profileUrl, { params })
      .pipe(
        tap(data => {
          this.setChef(data[0]);
        })
      );
  }

  saveChef(chef: Chef): Observable<Chef>{
    return this.http
      .post<Chef>(this.profileUrl, chef)
      .pipe(
        tap(result => {
          // this.fetchChef(result.email);
          this.setChef(result);
        })
      );
  }

  updateChef(chef: Chef): Observable<Chef>{
    return this.http
      .put<Chef>(this.profileUrl+"/"+ chef._id, chef)
      .pipe(
        tap(result => {
          // this.fetchChef(result.email);
          this.setChef(result);
        })
      );
  }
  
  setChef(result: Chef) {
    this.localService.saveData(this.storageItem, JSON.stringify(result));
    this.chef$.next(result);
  }

  getCurrentChef(): Chef {
    var json = this.localService.getData(this.storageItem);
    if ( json !== "" && json !== null && json !== undefined){
      var obj = JSON.parse(json);
      return obj.constructor.name === 'Array'? obj[0]: obj;
    }
    return null;
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

  fetchSlots(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.slotsUrl);
  }

  getCuisineById(id: string): Observable<Cuisine> {
    return this.http.get<Cuisine>(this.cuisinesUrl+"/"+ id);
  }

  createNewChef(chef: Chef): Observable<Chef> {
    return this.http.post<Chef>(this.profileUrl, chef);
  }
}
