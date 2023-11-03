import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('headerContainer') headerContainer: ElementRef<HTMLDivElement>;
  @ViewChild('closeButton') closeButton: ElementRef<HTMLButtonElement>;;
  @ViewChild('navBar') navBar: ElementRef<HTMLDivElement>;;

  selectedNav: string = "Dashboard";

  constructor(  private router: Router){
    this.selectedNav = "Dashboard";
  }

  showHide() {
    this.navBar.nativeElement.classList.toggle('show');
    this.bodyScroll();
  }

  bodyScroll() {
    if (this.navBar.nativeElement.classList.contains('show')) {
      this.headerContainer.nativeElement.classList.add('hide-scroll');
    }
    else if (this.headerContainer.nativeElement.classList.contains('hide-scroll')) {
      this.headerContainer.nativeElement.classList.remove('hide-scroll');
    }
  }

  onSelectNavLink(nav: string, route: string){
    this.selectedNav = nav;
    this.router.navigate([route]);
  }

  isNavSelected(nav: string) {
    if (this.selectedNav === nav) {
      return true;
    }
    return false;
  }

}
