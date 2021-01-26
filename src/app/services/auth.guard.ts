import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { UserService } from "./user.service";
import { map } from "rxjs/operators"
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  


  constructor(
    private userService: UserService,
    public router: Router,
    public auth: AuthService
  ){

  }



  authenticated: boolean


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.userService.isAuthenticated){
      return true
    }
    else {
      return this.userService.checkSession().pipe( 
        map( res => {
        if(res.LOGGED_IN){
          return true
        }
        else {
          console.log('passed this')
          this.router.navigateByUrl('/login');
          return false
        }
      }))
  

    }
   
    

 
    

 





  }





}

