import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoadPermissionGuard implements CanLoad {



constructor(
  public userService: UserService,
  public router: Router,
  public auth: AuthService
){

}


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isLoggedIn){
        return true 
      }
      return this.userService.checkSession().pipe(map( res => {
        if(res.LOGGED_IN) {
          this.router.navigate(['dashboard']);
          return false

        } else {
          
          return true
        }

      }, take(1),
      ))

  
  }
}
