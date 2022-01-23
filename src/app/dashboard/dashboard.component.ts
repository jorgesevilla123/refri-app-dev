import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';




@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class DashboardComponent implements OnInit {

  isSmallScreen: boolean


  
  constructor(private breakpointObserver: BreakpointObserver) {}


    ngOnInit(): void {
      
    
    this.breakpointObserver.observe('(max-width: 600px)').subscribe(
      breakpoints => {
        this.isSmallScreen = breakpoints.matches,
        console.log(breakpoints.matches)
      }
    )

    }
    





  
}
