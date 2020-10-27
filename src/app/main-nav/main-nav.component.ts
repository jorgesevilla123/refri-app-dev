import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from "../services/user.service"
import { Router } from '@angular/router';




@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public router: Router
    ) {}



    onLogout() {
      this.userService.userLogout().subscribe(
        res => {
          if(res.LOGGED_OUT){
            this.router.navigate(['login']);
          } else {
            console.log('not redirected');
          
          }
          

        }


      )
    }

}
