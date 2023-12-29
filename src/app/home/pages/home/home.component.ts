import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { Chef, Menu, Order, OrderProfileResponse } from 'src/app/model/all-models';
import { AccountService } from 'src/app/services/account.service';
import { ContextService } from 'src/app/services/context.service';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  chef: Chef;
  activeLayout: string;
  selectedOrderSummaryPeriod: string;
  menus: Menu[];
  orderProfile: OrderProfileResponse;
  destroy$ = new Subject<void>();
  isAuthenticated = false;

  constructor(private menuSvc: MenuService,
    private accountService: AccountService,
    private router: Router,
    private profileSvc: ProfileService,
    private http: HttpClient,
    private orderSvc: OrderService) { }

  ngOnInit() {
    this.activeLayout = 'home';

    this.chef = this.profileSvc.getCurrentChef();
    if ( this.chef !== null && this.chef !== undefined){
      this.fetchMenus();
      this.fetchOrderProfile();
    }else{
     this.getProfile();
    }
  }

  private getProfile() {
    let observable = this.profileSvc.getChef();
      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.chef = data[0];
          if ( this.chef !== null && this.chef !== undefined){
            this.fetchMenus();
            this.fetchOrderProfile();
          }
        },
        error: (err) => {
          console.error('Erros when getting chef from server')
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchMenus() {
    this.menuSvc.getMenus(this.chef._id).subscribe(
      (data: Menu[]) => {
        this.menus = data;
      },
      (err) => {
        console.error('Error when fetching the menus');
      }
    );
  }

  fetchOrderProfile() {
    console.log('Fetching orders for '+this.chef.email+', '+ this.chef._id)
    let observable = this.orderSvc.getProfile(this.chef.email, this.chef._id);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.orderProfile = data;
      },
      error: (err) => {
        console.error('Erros when getting Order Profile from server '+ JSON.stringify(err))
      },
    });
  }



  selectLayout(layout: string) {
    this.activeLayout = layout;
  }

  isSelectedOrderSummaryPeriod(orderSummaryPeriod: string) {
    if (this.selectedOrderSummaryPeriod === orderSummaryPeriod) {
      return true;
    }
    return false;
  }

  selectOrderSummaryPeriod(period: string) {
    this.selectedOrderSummaryPeriod = period;
  }
}
