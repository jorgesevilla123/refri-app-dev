import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private http: HttpClient
  ) { }


  getTestApi(query){
    this.http.get(`http://localhost:4200/api/tests/query?${query}`)
  }







}
