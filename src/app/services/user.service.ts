import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userInterface } from "../interfaces-models/users";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import {  FormControl, FormGroup } from "@angular/forms";
import { Observable} from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {




  constructor(
    private http: HttpClient
  ) {

    this.usersUrl = environment.USERS_API

   }


   isAuthenticated: boolean = false

  

  usersUrl: string

  signupForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl()
  })


  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })




  getUsers(): Observable<userInterface> {
    return this.http.get<userInterface>(`${this.usersUrl}/getUsers`).pipe(
      map( res => {return res})
    )

  }


  signUsers(userForm : FormData): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/signup`, userForm).pipe(
      map( res => {
        console.log(res);
      })
    )
  }

  loginUsers(userForm: FormData): Observable<any>{
    return this.http.post<any>(`${this.usersUrl}/login`, userForm).pipe(
      map(res => {
        if(res.LOGGED_IN) {
          this.isAuthenticated = true
          return this.isAuthenticated && res
        }
        return res

        
    
        })
    )

  }





}
