import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService, isLoggedIn } from "../services/user.service"
import { Router } from '@angular/router';




@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  signedIn$: Observable<boolean>



  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public router: Router
  ) { }





  ngOnInit(){
    // this.signedIn$ = this.userService.checkSession().pipe(
    //   map(
    //     res => {return res.LOGGED_IN}
    //   )
    // )

  }



  onLogout() {
    this.userService.userLogout().subscribe(
      res => {
        if (res.LOGGED_OUT) {
          this.router.navigate(['login']);
        } else {
          console.log('not redirected');
        }
      }
    )
  }


  onSignin() {
    this.router.navigate(['/login']);
  }




}
