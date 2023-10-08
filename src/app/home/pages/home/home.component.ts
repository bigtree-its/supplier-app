import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  activeLayout: string;
  selectedOrderSummaryPeriod: string;

  ngOnInit(){
    this.activeLayout = 'home';
  }

  selectLayout(layout: string){
    this.activeLayout = layout;
  }

  isSelectedOrderSummaryPeriod(orderSummaryPeriod: string){
    if (this.selectedOrderSummaryPeriod === orderSummaryPeriod) {
      return true;
    }
    return false;
  }

  selectOrderSummaryPeriod(period: string){
    this.selectedOrderSummaryPeriod = period;
  }
}
