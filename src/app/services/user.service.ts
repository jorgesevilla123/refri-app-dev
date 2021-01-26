import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { userInterface } from "../interfaces-models/users";
import { debounceTime, distinctUntilChanged, switchMap, map, catchError } from "rxjs/operators";
import {  FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, throwError} from "rxjs";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

export interface isLoggedIn {

  LOGGED_IN: boolean
    
}



@Injectable({
  providedIn: 'root'
})




export class UserService {


  



  constructor(
    public http: HttpClient,
    public router: Router
  ) {

    this.usersUrl = environment.USERS_API

   }


   isAuthenticated: boolean = false
   checkAuthenticated: boolean

  

  usersUrl: string

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl()
  })


  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })




  getUsers(): Observable<userInterface> {
    return this.http.get<userInterface>(`${this.usersUrl}/getUsers`).pipe(
      res => {return res}
    )

  }


  signUsers(userForm : FormData): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/signup`, userForm).pipe(
      map( res => {
        return res
      })
    )
  }

  loginUsers(userForm: FormData): Observable<any>{
    return this.http.post<any>(`${this.usersUrl}/login`, userForm).pipe(
      map(res => {
        if(res.LOG_IN) {
          this.isAuthenticated = true
          return this.isAuthenticated && res
        } else {
          this.isAuthenticated = false;
          return res
        }
        })
    )
  }


  checkSession(): Observable<isLoggedIn> {
    return this.http.post<isLoggedIn>(`${this.usersUrl}/check-session`, 'hello')

}


checkLoggedIn(): Observable<isLoggedIn> { 
  return this.http.post<isLoggedIn>(`${this.usersUrl}/check-session`, 'hello').pipe(
    map( res => {
      return res
    })
  )
}


userLogout(): Observable<any> {
  return this.http.post<any>(`${this.usersUrl}/logout`, '').pipe(
    map( res => {return res})
  )
}



}
