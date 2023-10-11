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

  constructor(private _location: Location, private menuSvc: MenuService) {}

  ngOnInit(): void {
    this.loginSessionJson = sessionStorage.getItem('loginSession');
    if (this.loginSessionJson !== null && this.loginSessionJson !== undefined) {
      var session: LoginResponse = JSON.parse(this.loginSessionJson);
      this.menuSvc.getMenus(session.email).subscribe(
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
}
