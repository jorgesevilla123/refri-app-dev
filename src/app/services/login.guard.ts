import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


constructor(
  public userService: UserService,
  public router: Router,
  public auth: AuthService
)
{

}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isLoggedIn){
        return true 

      }

      return this.userService.checkSession().pipe(map( res => {
        if(res.LOGGED_IN) {
          this.router.navigate(['dashboard']);
          console.log(route)
          return false
       

        } else {
          
          return true
        }

      }))


    

      
     


    }
    
}
