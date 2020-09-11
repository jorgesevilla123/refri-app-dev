import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Currency } from "../currency";

@Injectable({
  providedIn: 'root'
})
export class BusinessConfigurationsService {

  private currencyUrl = 'http://localhost:4200/api/currency-change';


  constructor(
    private http: HttpClient
  ) { }


  addCurrency(value: FormData){
    return this.http.post(`${this.currencyUrl}/addPrice`, value).subscribe(
      res => console.log(res),
      error => console.log(`Error in configurations service: ${error}`)
    )

  }

  getCurrency(): Observable<any>{
    return this.http.get(`${this.currencyUrl}/most-recent`).pipe(
      map( currentCurrency => {return currentCurrency})
    )
  
    
    
  }



}
