import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { UserService } from "./user.service";
import { catchError, map } from "rxjs/operators"
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  


  constructor(
    private userService: UserService,
    public router: Router
  ){

  }



  authenticated: boolean


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   return this.userService.checkSession().pipe(
      map(res => {
        if(res.LOGGED_IN){
          console.log('can activate executed')
          return true
        } else {
          return false
        }

      })
    )


   
    
}






}

