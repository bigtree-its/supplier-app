import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginResponse, Menu } from 'src/app/model/all-models';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  activeLayout: string = '';
  name: string = '';
  description: string;
  spiceLevel: string;
  loginSessionJson: string;
  menus: Menu[];
  menu: Menu;
  displayEditMenuItem:boolean;

  menuOnEdit: Menu;
  itemName:string;
  itemDesc:string;
  itemPrice:number;
  spice:number;
  itemDiscountedPrice:string;
  vegetarian:boolean;
  doPartyOrders: boolean;
  doDelivery: boolean;
  selectedCollection: string;
  supplierEmail: string;
  menuEditPanelTitle: string;
  selectedCollectionForDisplay: string;

  constructor(private _location: Location, private menuSvc: MenuService) {}

  ngOnInit(): void {
    this.loginSessionJson = sessionStorage.getItem('loginSession');
    if (this.loginSessionJson !== null && this.loginSessionJson !== undefined) {
      var session: LoginResponse = JSON.parse(this.loginSessionJson);
      this.supplierEmail = session.email;
      this.fetchMenus();
    }
  }

  selectLayout(e: string){
    this.activeLayout = e;
  }

  goBack() {
    this._location.back();
  }

  selectVegetarian(e: any) {
    if (e.target.checked) {
      this.menu.vegetarian = true;
    } else {
      this.menu.vegetarian = false;
    }
  }

   selectSpiceLevel(level: number){
    this.spice = level;
    console.log('Spice Level: '+ this.spice);
  }

  selectCollection(collection: string) {
    this.selectedCollection = collection;
  }

  handleVegetarian(evt) {
    var target = evt.target;
    if (target.checked) {
      this.vegetarian = true;
    } else {
      this.vegetarian = false;
    }
  }

  handlePartyOrders(evt) {
    var target = evt.target;
    if (target.checked) {
      this.doPartyOrders = true;
    } else {
      this.doPartyOrders = false;
    }
  }

  handleDelivery(evt) {
    var target = evt.target;
    if (target.checked) {
      this.doDelivery = true;
    } else {
      this.doDelivery = false;
    }
  }

  onRemoveFood(foodToDelete: Menu) {
    this.menuSvc.deleteFood(foodToDelete).subscribe(any => {
      this.fetchMenus();
    }, err => { });
  }

  fetchMenus() {
    this.menuSvc.getMenus(this.supplierEmail).subscribe(
      (data: Menu[]) => {
        this.menus = data;
        if ( data === null || data.length === 0){
          this.activeLayout= "add";
        }else{
          this.activeLayout= "list";
        }
      },
      (err) => {
        window.alert('Error when fetching the menus');
      }
    );
  }

  onEditFood(menuToEdit: Menu) {
    this.menuOnEdit = menuToEdit;
    this.displayEditMenuItem = true;
    this.menuEditPanelTitle = menuToEdit.name;
    this.selectedCollection = menuToEdit.collectionId;
    this.itemName = menuToEdit.name;
    this.itemDesc = menuToEdit.description;
    this.itemPrice = menuToEdit.price;
    this.vegetarian = menuToEdit.vegetarian;
    this.spice = menuToEdit.spice;
  }

  selectCategoryForDisplay(collection: string) {
    this.selectedCollectionForDisplay = collection;
  }

  isCollectionSelected(collection: string) {
    return this.selectedCollectionForDisplay === collection;
  }

  onClickAddNewFood() {
    this.displayEditMenuItem = true;
    this.vegetarian = false;
    this.spice = 1;
    this.menuEditPanelTitle = "Create New Food";
  }

  cancelItemEdit() {
    this.displayEditMenuItem = false;
    this.itemName = "";
    this.itemDesc = "";
    this.itemPrice = 0;
    this.spice = 1;
    this.vegetarian = false;
    this.selectedCollection = "";
    this.menuOnEdit = null;
  }

  clearFoodEdit() {
    this.itemName = "";
    this.itemDesc = "";
    this.itemPrice = 0;
    this.spice = 1;
    this.vegetarian = false;
    this.selectedCollection = "";
  }

}
