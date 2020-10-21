import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { map, filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'refri-data';

  


  constructor(
    public router: Router

  ) {
    

    router.events.subscribe(
      event => {
      
        if(event instanceof NavigationEnd){
          this.currentRoute = event.url
        }

      }
    )

    

  }

  currentRoute: string








}
