import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { Products } from "../products";
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private productsUrl = 'http://localhost:4200/api/products';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': "application/json"})
  }

  constructor(
    private http: HttpClient

  ) { }

  getProducts():  Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl)
    .pipe(
      tap(_ => console.log('products fetched')),
      catchError(this.handleError)
    )

  }

  //error handleling instance

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
}
