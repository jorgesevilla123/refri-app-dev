import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SalesInterface } from "../../../models/sales-model";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SalesService {

  //env variable for sale's api url 
  salesUrl: string

  constructor(
    private http: HttpClient
  ) {

    this.salesUrl = environment.SALES_API

   }




  getSales(): any {
    return this.http.get<any>(`${this.salesUrl}/get-sales`).pipe(
      map( sales => {
        return sales
      })
    )

  }


  addSale(sale): Observable<SalesInterface>{
    return this.http.post<SalesInterface>(`${this.salesUrl}/add-sales`, sale)



  }


  searchSaleByDate(date): any{
    return this.http.get(`${this.salesUrl}/search-sales-by-date?date=${date}`)

    
  }














}


