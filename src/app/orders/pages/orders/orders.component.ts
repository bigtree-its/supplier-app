import { Location } from '@angular/common';
import { Component, TRANSLATIONS, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  LoginResponse,
  Order,
  OrderTracking,
  PeriodicElement,
} from 'src/app/model/all-models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  actionOnOrder: Order;

  selectedPeriod: string = 'This Month';

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

  constructor(
    private _location: Location,
    private orderSvc: OrderService, private modalSvc: NgbModal) {}

  ngOnInit() {
    this.loginSessionJson = sessionStorage.getItem('loginSession');
    if (this.loginSessionJson !== null && this.loginSessionJson !== undefined) {
      var session: LoginResponse = JSON.parse(this.loginSessionJson);
      this.orderSvc.getOrders(session.email, '').subscribe(
        (data: Order[]) => {
          this.orders = data;
          this.dataSource = data;
          this.monthlyOrders = data;
          this.groupOrders();
        },
        (err) => {
          window.alert('Error when fetching the orders');
        }
      );
    }
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
      if (
        this.loginSessionJson !== null &&
        this.loginSessionJson !== undefined
      ) {
        var session: LoginResponse = JSON.parse(this.loginSessionJson);
        this.orderSvc.getOrders(session.email, 'LastMonth').subscribe(
          (data: Order[]) => {
            this.orders = data;
            this.dataSource = data;
          },
          (err) => {
            window.alert('Error when fetching the orders');
          }
        );
      }
    }
    this.selectedPeriod = period;
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

  updateStatus(action: string) {
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
        status = 'REJECTED';
        break;
      }
      case 'Collected': {
        status = 'COLLECTED';
        break;
      }
      case 'Delivered': {
        status = 'DELIVERED';
        break;
      }
    }
    this.actionOnOrder.status = status;
    var tracking: OrderTracking = {
      reference: this.actionOnOrder.reference,
      status: status,
      _id: '',
      orderId: '',
      dateAccepted: undefined,
      datePaid: undefined,
      dateCancelled: undefined,
      dateDelivered: undefined,
      dateCollected: undefined,
      dateRefunded: undefined,
    };
    this.orderSvc.updateStatus(tracking).subscribe(
      (data: OrderTracking) => {
        this.actionOnOrder.status = data.status;
      },
      (err) => {
        window.alert('Error when ' + status + ' the order');
      }
    );
    this.modalSvc.dismissAll();
  }
}
