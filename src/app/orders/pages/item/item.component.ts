import { Component, Input } from '@angular/core';
import { Order, OrderTracking } from 'src/app/model/all-models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() order: Order;

  constructor(private orderSvc: OrderService) {}

  updateStatus(status: string){
    this.order.status = status;
    var tracking: OrderTracking ={
      reference: this.order.reference,
      status: status,
      _id: '',
      orderId: '',
      dateAccepted: undefined,
      datePaid: undefined,
      dateCancelled: undefined,
      dateDelivered: undefined,
      dateCollected: undefined,
      dateRefunded: undefined
    } 
    this.orderSvc.updateStatus(tracking).subscribe(
      (data: OrderTracking) => {
        this.order.status = data.status
      },
      (err) => {
        window.alert('Error when '+status+' the order');
      }
    );
  }
}
