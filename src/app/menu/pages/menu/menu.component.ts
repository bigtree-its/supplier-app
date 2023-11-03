import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chef, Collection, Extra, LoginResponse, Menu } from 'src/app/model/all-models';
import { MenuService } from 'src/app/services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  activeLayout: string = '';
  subLayout: string = '';

  name: string = '';
  description: string;
  spiceLevel: number = 1;
  loginSessionJson: string;
  menus: Menu[];
  specials: Menu[];
  menu: Menu;
  displayEditMenuItem: boolean;

  collectionForm: FormGroup;

  menuOnEdit: Menu;
  itemName: string;
  itemDesc: string;
  itemPrice: number;
  itemDiscountedPrice: string;
  vegetarian: boolean;
  doPartyOrders: boolean;
  doDelivery: boolean;
  selectedCollection: Collection;
  supplierEmail: string;
  menuEditPanelTitle: string;
  selectedCollectionForDisplay: Collection;
  chef: Chef;
  collections: Collection[];
  collectionName: string;
  menuOnView: Menu;
  newMenu: Menu;
  menuNameErr: boolean;
  menuNameErrMsg: string;
  menuDescErr: boolean;
  menuDescErrMsg: string;
  menuPriceErr: boolean;
  menuPriceErrMsg: string;
  menuCollErr: boolean;
  menuCollErrMsg: string;

  extra: Extra = new Extra();
  choices: Extra[] = [];
  extras: Extra[] = [];

  states = [
    { name: 'Arizona', abbrev: 'AZ' },
    { name: 'California', abbrev: 'CA' },
    { name: 'Colorado', abbrev: 'CO' },
    { name: 'New York', abbrev: 'NY' },
    { name: 'Pennsylvania', abbrev: 'PA' },
  ];

  form = new FormGroup({
    collection: new FormControl(null),
  });
  spiceLevelChanged: boolean;
  err: boolean;
  errMsg: string;
  special: boolean;
  choicePrice: any;
  extraType: string;

  constructor(private _location: Location,
    private profileSvc: ProfileService,
    private menuSvc: MenuService,
    private modalSvc: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.activeLayout = "Home";
    var chefJson = localStorage.getItem("chef");
    if (chefJson !== null && chefJson !== undefined) {
      this.chef = JSON.parse(chefJson)[0];
      this.fetchCollections(this.chef._id);
      this.fetchMenus(this.chef._id);
    } else {
      this.loginSessionJson = sessionStorage.getItem('loginSession');
      if (this.loginSessionJson !== null && this.loginSessionJson !== undefined) {
        var session: LoginResponse = JSON.parse(this.loginSessionJson);
        this.supplierEmail = session.email;
        this.profileSvc.getProfile(session.email).subscribe(
          (res) => {
            this.chef = res;
            localStorage.setItem("chef", JSON.stringify(this.chef));
            this.fetchCollections(this.chef._id);
            this.fetchMenus(this.chef._id);
          },
          (err) => {
            window.alert('Err: Unable to fetch your profile')
          },
        );
      } else {
        this.router.navigate(['login']);
      }
    }
  }


  selectActiveLayout(main: string, sub: string) {
    this.activeLayout = main;
    this.subLayout = sub;
  }

  selectSubLayout(sub: string) {
    this.subLayout = sub;
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

  onChangeCollection(newValue: any) {
    this.selectedCollection = this.form.controls['collection'].value;
  }

  handleVegetarian(evt) {
    var target = evt.target;
    if (target.checked) {
      this.vegetarian = true;
    } else {
      this.vegetarian = false;
    }
  }

  handleSpecial(evt) {
    var target = evt.target;
    if (target.checked) {
      this.special = true;
    } else {
      this.special = false;
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
      this.fetchMenus(this.chef._id);
    }, err => { });
  }

  fetchMenus(chefId: string) {
    this.menuSvc.getMenus(chefId).subscribe(
      (data: Menu[]) => {
        this.menus = data;
        this.specials = this.menus.filter(m => { return m.special });
      },
      (err) => {
        window.alert('Error when fetching the menus');
      }
    );
  }

  fetchCollections(chefId: string) {
    this.menuSvc.getCollections(chefId).subscribe(
      (data: Collection[]) => {
        this.collections = data;
      },
      (err) => {
        window.alert('Error when fetching the collections');
      }
    );
  }

  addCollection() {
    this.subLayout = "addCollection";
  }

  viewMenu(menu: Menu) {
    this.menuOnView = menu;
    this.activeLayout = "view";
    console.log('Viewing menu ' + JSON.stringify(this.menuOnView))
  }

  onEditMenu(menuToEdit: Menu) {
    this.subLayout = "editMenu";
    this.menuOnEdit = menuToEdit;
    if ( this.menuOnEdit.choices !== null && this.menuOnEdit.choices !== undefined){
      this.choices = menuToEdit.choices;
    }
    if ( this.menuOnEdit.extras !== null && this.menuOnEdit.extras !== undefined){
      this.extras = menuToEdit.extras;
    }
    this.menuEditPanelTitle = menuToEdit.name;

    var collection: Collection[] = this.collections.filter(e => { return e._id === menuToEdit.collectionId });
    this.form.controls['collection'].patchValue(collection[0]);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onRemoveMenu(menu: Menu) {

  }

  setActiveLayout(layout: string) {
    this.activeLayout = layout;
  }

  onClickAddNewMenu() {
    this.activeLayout = "add";
  }
  selectCollectionForDisplay(col: Collection) {
    this.selectedCollectionForDisplay = col;
  }

  isCollectionSelected(col: Collection) {
    if (this.selectedCollectionForDisplay === null || this.selectedCollectionForDisplay === undefined) {
      this.selectedCollectionForDisplay = this.collections[0];
    }
    return this.selectedCollectionForDisplay._id === col._id;
  }

  saveMenu() {
    if (this.newMenu !== null && this.newMenu !== undefined) {
      if (this.spiceLevelChanged) {
        this.newMenu.spice = this.spiceLevel;
      }
      if (this.form.controls['collection'].value === null) {
        this.err = true;
        this.errMsg = "Collection is required";
        return;
      }
      this.newMenu.collectionId = this.form.controls['collection'].value._id;
      if (this.newMenu.name === null || this.newMenu.name === undefined) {
        this.err = true;
        this.errMsg = "Name is required.";
        return;
      } else {
        this.err = false;
      }
      if (this.newMenu.description === null || this.newMenu.description === undefined) {
        this.err = true;
        this.errMsg = "Description is required.";
        return;
      } else {
        this.err = false;
      }
      if (this.newMenu.price === 0 || this.newMenu.price === undefined) {
        this.err = true;
        this.errMsg = "Price is required.";
        return;
      } else {
        this.err = false;
      }
      this.newMenu.vegetarian = this.vegetarian;
      this.newMenu.special = this.special;
      this.newMenu.extras = this.extras;
      this.newMenu.choices = this.choices;
      this.menuSvc.createNewFood(this.newMenu).subscribe(
        (res) => {
          this.newMenu = null;
          this.menuOnEdit = null;
          this.spiceLevelChanged = false;
          this.fetchMenus(this.chef._id);
          this.activeLayout = "Menus";
          this.selectSubLayout('listMenu');
        },
        (err) => { },
      );
    }
    else {
      var collection: Collection = this.form.controls['collection'].value;
      this.menuOnEdit.collectionId = collection._id;
      if (this.spiceLevelChanged) {
        this.menuOnEdit.spice = this.spiceLevel;
      }
      this.menuOnEdit.vegetarian = this.vegetarian;
      this.menuOnEdit.special = this.special;
      if (this.menuOnEdit.price === 0 || this.menuOnEdit.price === undefined) {
        this.err = true;
        this.errMsg = "Price is required.";
        return;
      } else {
        this.err = false;
      }
      this.menuOnEdit.extras = this.extras;
      this.menuOnEdit.choices = this.choices;
      this.menuSvc.updateMenu(this.menuOnEdit).subscribe(
        (res) => {
          this.newMenu = null;
          this.menuOnEdit = null;
          this.spiceLevelChanged = false;
          this.fetchMenus(this.chef._id);
          this.selectSubLayout('listMenu');
        },
        (err) => { },
      );
    }
  }

  openModal(content) {
    this.modalSvc
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => { },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  handleSpiceLevelChange(e) {
    this.spiceLevel = e.target.value;
    this.spiceLevelChanged = true;
  }

  saveNewCollection() {
    this.menuSvc.saveCollection(this.collectionName, this.chef._id).subscribe(
      (res) => {
        var col: Collection = res;
        this.collections.push(col);
        this.subLayout = "listCollection"
        this.closeModal();
      },
      (err) => { },
    );
  }

  cancel() {
    console.log('Slecting list view')
    this.activeLayout = "list";
  }

  addMenu() {
    this.subLayout = "addMenu";
    this.newMenu = new Menu();
    this.newMenu.chefId = this.chef._id;
  }

  cancelError() {
    this.err = false;
    this.errMsg = '';
  }

  removeCollection(collection: Collection) {
    this.menuSvc.deleteCollection(collection).subscribe(
      (res) => {
        this.fetchCollections(this.chef._id);
      },
      (err) => {
        this.err = true;
        this.errMsg = 'Unable to delete the collection. Retry later';
      },
    );
  }

  addExtra() {
    console.log('Extra '+ JSON.stringify(this.extra))
    if (this.extra === null || this.extra === undefined || 
      this.extra.price === 0 || this.extra.price === undefined || 
      this.extra.name === null || this.extra.name === undefined || this.extra.name.trim().length === 0
      ) {
      this.err = true;
      this.errMsg = "Choice is not valid";
      return;
    }
    this.choices.forEach(e => {
      if (e.name.trim() === this.extra.name.trim()) {
        this.err = true;
        this.errMsg = "Choice is already exist";
        return;
      }
    });
    if ( this.extraType === 'Choice'){
      this.choices.push(this.extra);
    }else{
      this.extras.push(this.extra);
    }
    this.err = false;
    this.errMsg = '';
    this.extra = new Extra();
    this.closeModal();
  }

  openExtraModal(content, dataType){
    this.extraType = dataType;
    this.modalSvc
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => { },
        (reason) => {
        }
      );
  }
  removeChoice(choice:Extra){
    for ( var i=0; i< this.choices.length; i++){
      if ( this.choices[i].name == choice.name){
        this.choices.splice(i,1);
      }
    }
  }
  removeExtra(e:Extra){
    for ( var i=0; i< this.extras.length; i++){
      if ( this.extras[i].name == e.name){
        this.extras.splice(i,1);
      }
    }
  }
  closeModal(){
    this.modalSvc.dismissAll();
  }
}
