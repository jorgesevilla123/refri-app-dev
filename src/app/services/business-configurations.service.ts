import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Currency } from "../currency";

@Injectable({
  providedIn: 'root'
})
export class BusinessConfigurationsService {

  //env variable for api
  private currencyUrl = process.env.CONFIG_API;


  constructor(
    private http: HttpClient
  ) { }


  addCurrency(value: FormData): Observable<Currency>{
    return this.http.post<Currency>(`${this.currencyUrl}/addPrice`, value).pipe(
      map(res => {return res})
    )
  }

  getCurrency(): Observable<any>{
    return this.http.get(`${this.currencyUrl}/most-recent`).pipe(
      map( currentCurrency => {return currentCurrency})
    )
  
    
    
  }


  getCurrencies(): Observable<any> {
    return this.http.get(`${this.currencyUrl}`).pipe(
      map( currencies => {return currencies})
    )
  }



}
