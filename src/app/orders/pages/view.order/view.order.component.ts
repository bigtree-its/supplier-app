import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderTracking } from 'src/app/model/all-models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view.order',
  templateUrl: './view.order.component.html',
  styleUrls: ['./view.order.component.css']
})
export class ViewOrderComponent {

  orderReference: string;
  order: any;

  constructor(private activatedRoute: ActivatedRoute, private orderSvc: OrderService) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.orderReference = params['id'];
      var orderJson = sessionStorage.getItem("chef-single-order");
      if (orderJson !== null && orderJson !== undefined) {
        this.order = JSON.parse(orderJson);
      }
    });


  }


  onAction(action: string){
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
      case 'Commplete': {
        status = this.order.serviceMode === 'COLLECTION'? 'COLLECTED':'DELIVERED';
        break;
      }
      case 'Delivered': {
        status = 'DELIVERED';
        break;
      }
    }
    this.order.status = status;
    var tracking: OrderTracking = {
      reference: this.order.reference,
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
        this.order.status = data.status;
      },
      (err) => {
        window.alert('Error when ' + status + ' the order');
      }
    );
  }

}
