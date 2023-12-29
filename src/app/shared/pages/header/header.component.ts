import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/model/all-models';
import { AccountService } from 'src/app/services/account.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @ViewChild('headerContainer') headerContainer: ElementRef<HTMLDivElement>;
  @ViewChild('closeButton') closeButton: ElementRef<HTMLButtonElement>; chef: any;
  user: User;

  @ViewChild('navBar') navBar: ElementRef<HTMLDivElement>;;

  selectedNav: string = "Dashboard";

  constructor(private router: Router, private ctxSvc: ContextService, private accountService: AccountService) {
    this.selectedNav = "Dashboard";
    console.log('Selected Nav: '+ this.selectedNav)
  }

  ngOnInit(): void {

    this.accountService.loginSession$.subscribe(e=>{
      this.user = e;
    });
    // var s = this.accountService.getCurrentSession();
  
    // if ( s != null && s !== undefined){
    //   this.session = s;
    // }
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

  onSelectNavLink(nav: string, route: string) {
    this.selectedNav = nav;
    this.router.navigate([route]);
    console.log('Selected Nav: '+ this.selectedNav)
  }

  isNavSelected(nav: string) {
    if (this.selectedNav === nav) {
      return true;
    }
    return false;
  }

  logout() {
    this.accountService.logout();
    this.showHide()
  }

}
