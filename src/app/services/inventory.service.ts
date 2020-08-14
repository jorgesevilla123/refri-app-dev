import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { Products } from "../products";
import {  FormControl, FormGroup } from "@angular/forms";
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
 

  private productsUrl = 'http://localhost:4200/api/products';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'multipart/form-data'})
  }
  




  constructor(
    private http: HttpClient,

  ) {}


  
  productsForm: FormGroup = new FormGroup({
    _id: new FormControl(),
    title: new FormControl(),
    modelo: new FormControl(),
    precio: new FormControl(),
    cantidad: new FormControl()



  })

  photoForm: FormGroup = new FormGroup({
    _id: new FormControl(),
    imagePath: new FormControl()
  })





  getProducts():  Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl).pipe()

  }




  addProducts(product: FormData) {
    return this.http.post(this.productsUrl, product).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    }
    

    )


  }

  deleteProduct(product: Products | string){
    const id = typeof product === 'string' ? product : product._id;
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete(url).subscribe({
      next: data => console.log(data),
      error: error => console.error(error)
    }
    )

  }

  editProduct(product: FormData){
    const id = product.get('_id');
    const url = `${this.productsUrl}/update/${id}`;
    return this.http.put(url, product).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    }
    )

  }

  editProductPhoto(product: FormData){
    const id = product.get('_id');
    const url = `${this.productsUrl}/update-photo/${id}`;
    return this.http.put(url, product).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    }
    )
  }
  

  searchProduct(keyLetter: string): Observable<Products[]>{
    if(!keyLetter.trim()){
      //if there's no search term return empty product 
      return of([]);
    }
    return this.http.get<Products[]>(`${this.productsUrl}/search?title=${keyLetter}`).pipe(
      tap(L => L.length ?
        console.log('found products matching') : 
        console.log('no products found')),
        catchError(this.handleError<Products[]>('searchProduct', [])
          )
    )


  }


  
  

  //error handleling instance

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  populateForm(product){
    this.productsForm.patchValue({
      _id: product._id,
      title: product.title,
      modelo: product.modelo,
      precio: product.precio,
      cantidad: product.cantidad
    })
  }

  populatePhotoForm(product){
    this.photoForm.patchValue({
      _id: product._id
    })
  }





    }


