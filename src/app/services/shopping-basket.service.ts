import { Injectable } from '@angular/core';
import { shoppingBasket } from "../shopping-basket";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {

  private shoppingBasketUrl = 'http://localhost:4200/api/shoppingBasket';

  constructor(
    private http: HttpClient
  ) { }


  
showBasket(): Observable<shoppingBasket[]> {
  return this.http.get<shoppingBasket[]>(`${this.shoppingBasketUrl}/showProducts`).pipe();

}



shopProduct(product){
  return this.http.post(`${this.shoppingBasketUrl}/addToBasket`, product).subscribe(
    data => console.log('post succeed'),
    error => console.log(error)

  )}


  deleteProduct(product: shoppingBasket){

    const ID = typeof product === 'string' ? product : product._id;
    return this.http.delete(`${this.shoppingBasketUrl}/removeProduct/${ID}`).subscribe(
      result => console.log('successfully deleted', result),
      error => console.log('error deleting', error)
    )


  }


  emptyBasket(){
    return this.http.delete(`${this.shoppingBasketUrl}/emptyBasket`);
  }





}




