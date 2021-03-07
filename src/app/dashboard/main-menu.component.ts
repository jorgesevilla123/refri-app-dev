import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { InventoryService } from "../services/inventory.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  isSmallScreen: boolean


  
  constructor(private breakpointObserver: BreakpointObserver,
            public inventoryService: InventoryService
    ) {}


    ngOnInit(): void {
      
    
    this.breakpointObserver.observe('(max-width: 600px)').subscribe(
      breakpoints => {
        this.isSmallScreen = breakpoints.matches,
        console.log(breakpoints.matches)
      }
    )

    }
    





  
}
