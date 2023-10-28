import { Component, Input } from '@angular/core';
import { Menu } from '../../../model/all-models';

@Component({
  selector: 'app-li-menu',
  templateUrl: './li-menu.component.html',
  styleUrls: ['./li-menu.component.css']
})
export class LiMenuComponent {

  @Input() menu: Menu;
}
