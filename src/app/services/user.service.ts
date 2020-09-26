import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userInterface } from "../interfaces-models/users";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import {  FormControl, FormGroup } from "@angular/forms";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(
    private http: HttpClient
  ) { }

  

  usersUrl = 'api/users'

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()


  })



  getUsers(): Observable<userInterface> {
    return this.http.get<userInterface>(`${this.usersUrl}/getUsers`).pipe(
      map( res => {return res})
    )

  }


  loginUsers(userForm : FormData): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/signup`, userForm).pipe(
      map( res => {return res})
    )
  }





}
