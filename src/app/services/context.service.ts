import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Chef, Menu, Order } from "../model/all-models";
import { Utils } from "../helpers/utils";


@Injectable({
    providedIn: 'root'
})
export class ContextService {

    chefSbj: BehaviorSubject<Chef>;
    menuSbj: BehaviorSubject<Menu[]>;
    orderSbj: BehaviorSubject<Order[]>;

    private chef: Chef;
    private menus: Menu[] = [];
    private orders: Order[] = [];
    constructor(
        private utils: Utils
    ) {
        this.chefSbj = new BehaviorSubject<Chef>(this.chef);
        this.menuSbj = new BehaviorSubject<Menu[]>(this.menus);
        this.orderSbj = new BehaviorSubject<Order[]>(this.orders);
    }

    publishChef(chef: Chef) {
        this.chef = chef;
        this.chefSbj.next({ ...this.chef });
    }

    publishMenus(menus: Menu[]) {
        this.menus = menus;
        this.menuSbj.next({ ...this.menus });
    }

    publishOrders(orders: Order[]) {
        this.orders = orders;
        this.orderSbj.next({ ...this.orders });
    }
}