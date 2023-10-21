import { Component } from '@angular/core';
import { Chef, Menu } from 'src/app/model/all-models';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  chef: Chef;
  activeLayout: string;
  selectedOrderSummaryPeriod: string;
  menus: Menu[];

  constructor(private menuSvc: MenuService) {}

  ngOnInit() {
    this.activeLayout = 'home';
    var chefJson = localStorage.getItem('chef');
    window.alert(chefJson)
    if (chefJson !== null && chefJson !== undefined) {
      this.chef = JSON.parse(chefJson);
      this.menuSvc.getMenus(this.chef._id).subscribe(
        (res) => {
          this.menus = res;
          window.alert(JSON.stringify(res))
        },
        (err) => {}
      );
    }
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
