import { Location } from '@angular/common';
import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  LoginResponse,
  Order,
  OrderProfileResponse,
  OrderTracking,
  PeriodicElement,
  User,
} from 'src/app/model/all-models';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  actionOnOrder: Order;

  selectedPeriod: string = 'Today';

  periods: string[] = ['Today', 'Week', 'Month'];

  statuses: string[] = ['All', 'Open', 'Completed', 'Ready', 'Cancelled'];

  ELEMENT_DATA: Order[] = [];

  displayedColumns: string[] = [
    'Reference',
    'Date',
    'Customer',
    'Amount',
    'Status',
    'Action',
  ];
  dataSource: any;
  orders: Order[] = [];
  weeklyOrders: Order[] = [];
  monthlyOrders: Order[] = [];
  todayOrders: Order[] = [];
  loginSessionJson: string;
  action: any;
  profile: OrderProfileResponse;
  ordersToView: Order[];

  constructor(
    private _location: Location,
    private router: Router,
    private orderSvc: OrderService, 
    private accountSvc: AccountService,
    private modalSvc: NgbModal) {}

  ngOnInit() {
    this.orderSvc.orderSubject$.subscribe(e=>{
      this.profile = e;
      if ( e !== null && e !== undefined){
        this.ordersToView = this.profile.today;
      }else{
        console.log('Subscribed orders are empty');
        var user: User = this.accountSvc.getCurrentUser();
        console.log('user logged in.. fetching orders..')
        if ( user !== null && user !== undefined){
          this.orderSvc.getProfile(user.email, user.id).subscribe(e=>{
            this.profile = e;
            if ( e !== null && e !== undefined){
              this.ordersToView = this.profile.today;
            }
          });
        }
      }
      
    });
    // var chefOrderProfile = sessionStorage.getItem("chef-order-profile");
    // if ( chefOrderProfile !== null && chefOrderProfile !== undefined){
    //   this.profile = JSON.parse(chefOrderProfile);
    // }
  }

  openOrder(order: Order){
    sessionStorage.setItem("chef-single-order", JSON.stringify(order));
    this.router.navigate(['orders', order.reference]).then();
  }

  groupOrders() {
    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    let dayOfWeekNumber: number = today.getDay();
    let endDays: number = 7 - dayOfWeekNumber;
    var weekEnd: Date = this.addDays(today, endDays);
    weekEnd.setHours(0, 0, 0, 0);
    for (var i = 0; i < this.orders.length; i++) {
      var order: Order = this.orders[i];
      let orderDate: Date = new Date(order.dateCreated);
      orderDate.setHours(0, 0, 0, 0);
      if (
        orderDate.getTime() <= weekEnd.getTime() &&
        orderDate.getTime() >= today.getTime()
      ) {
        this.weeklyOrders.push(order);
      }
      if (orderDate.getTime() === today.getTime()) {
        this.todayOrders.push(order);
      }
    }
  }

  addDays(theDate: Date, days: number): Date {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  selectPeriodEvent(event) {}

  selectPeriod(period: string) {
    if (period === 'Today') {
      this.dataSource = this.todayOrders;
    }
    if (period === 'This Week') {
      this.dataSource = this.weeklyOrders;
    }
    if (period === 'This Month') {
      this.dataSource = this.monthlyOrders;
    }
    if (period === 'Last Month') {
      // TODO
    }
    this.selectedPeriod = period;
  }

  displayOrders(orders:Order[], period){
    this.ordersToView = orders;
    this.selectedPeriod= period;
  }

  selectStatus(event) {
    if (event.value === 'Open') {
    }
  }

  open(content, size, order: Order) {
    this.actionOnOrder = order;
    this.modalSvc
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: size })
      .result.then(
        (result) => {},
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openActionConfirmation(content, size, action) {
    this.action = action;
    this.modalSvc
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: size })
      .result.then(
        (result) => {},
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openActionModal(order: Order, content) {
    const modalRef = this.modalSvc.open(content);
    modalRef.componentInstance.order = order;
  }

  goBack(){
      this._location.back();
  }

  updateStatus(order: Order, action: string) {
    var status;
    switch (action) {
      case 'Accept': {
        status = 'ACCEPTED';
        break;
      }
      case 'Reject': {
        status = 'REJECTED';
        break;
      }
      case 'Refund': {
        status = 'REFUNDED';
        break;
      }
      case 'Complete': {
        status = order.serviceMode === 'COLLECTION' ? 'COLLECTED': 'DELIVERED';
        break;
      }
    }
    order.status = status;
    var tracking: OrderTracking = {
      reference: order.reference,
      status: status,
      _id: '',
      orderId: order._id,
      dateAccepted: undefined,
      datePaid: undefined,
      dateCancelled: undefined,
      dateDelivered: undefined,
      dateCollected: undefined,
      dateRefunded: undefined,
    };
    this.orderSvc.updateStatus(tracking).subscribe(
      (data: OrderTracking) => {
        order.status = data.status;
      },
      (err) => {
        window.alert('Error when ' + status + ' the order');
      }
    );
    
  }

  onAction(order: Order, e){
    this.updateStatus(order, e.target.value);
    this.modalSvc.dismissAll();
  }
  
}
