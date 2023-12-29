import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'supplier-app';

  ngOnInit(): void {
   sessionStorage.getItem("supplier-app-session");
  }
}
