import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { Products } from "../interfaces-models/products";
import {  FormControl, FormGroup } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import { tap, catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment"
import * as querystring from 'querystring';








@Injectable({
  providedIn: 'root'
})
export class InventoryService {
 
  //env variable for api
  productsUrl: string

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'multipart/form-data'})
  }
  




  constructor(
    private http: HttpClient,
  

  ) {

    this.productsUrl = environment.PRODUCTS_API;

  }


  
  productsForm: FormGroup = new FormGroup({
    _id: new FormControl(),
    title: new FormControl(),
    modelo: new FormControl(),
    precio: new FormControl(),
    cantidad: new FormControl(),
    categoria: new FormControl()



  })

  photoForm: FormGroup = new FormGroup({
    _id: new FormControl(),
    imagePath: new FormControl()
  })



  testToApi(): Observable<any> {
    return this.http.get(`${this.productsUrl}/checkProducts`).pipe(
      res => {return res}
    )

  }


  getProductsByCategory(category, page): any {
    return this.http.get<any>(`${this.productsUrl}/get-categories?category=${category}&page=${page}`).pipe(
      map(filteredProducts => {return filteredProducts})
    )

  }





  getProducts():  Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl).pipe(
      map(products => {return products})
    )
  }

  getPaginateProducts(page: any): Observable<any> {
    return this.http.get<any>(`${this.productsUrl}/products?page=${page}`).pipe(
      map(products => { return products})
    )
  }



  getOutOfStockProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.productsUrl}/out-of-stock`).pipe(
      map(products => {return products})
    )
  }


  getLowStockProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.productsUrl}/low-stock`).pipe(
      map(products => {return products})
    )
  }





  addProducts(product: FormData): Observable<Products> {
    return this.http.post<Products>(this.productsUrl, product)


  }

  deleteProduct(product: Products | string): Observable<any>{
    
    const id = typeof product === 'string' ? product : product._id;
    const url = `${this.productsUrl}/delete-product/${id}`;
    return this.http.delete<Products>(url).pipe(
      map(res => {return res})
    )

  }

  editProduct(product: FormData): Observable<Products>{
    console.log(`from service ${product.get('categoria')}`)
    const id = product.get('_id');
    const url = `${this.productsUrl}/update/${id}`;
    return this.http.put<Products>(url, product).pipe(
      map( res => {return res})
    )

  }

  editProductPhoto(product: FormData): Observable<Products>{
    const id = product.get('_id');
    const url = `${this.productsUrl}/update-photo/${id}`;
    return this.http.put<Products>(url, product);
  }
  
  searchProduct(keyLetter: Observable<string>){
    // if(!keyLetter.trim()){
      //if there's no search term return empty product 
      // return of([]);
    // }

    return keyLetter.pipe(

      debounceTime(1500),

      distinctUntilChanged(),

      switchMap( term => this.searchEntries(term))


    )

    
    //


  }

  //Accepts a complete query as argument 
  searchProductAndPaginate(query){
    let parsedQuery = querystring.stringify(query)
    console.log(query)
    console.log(parsedQuery)

    
    return this.http.get<any>(`${this.productsUrl}/search?${parsedQuery}`).pipe(
      map( res => {return res})
    )
 
  

  }




    searchEntries(keyLetter){
      if(!keyLetter.trim()){
        return of([]);
      }
      else{
      return this.http.get(`${this.productsUrl}/search?title=${keyLetter}`).pipe(
        map( res => {return res})
      )
   

    }
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
    console.log(product)
    this.productsForm.patchValue({
      _id: product._id,
      title: product.title,
      modelo: product.modelo,
      precio: product.precio,
      cantidad: product.cantidad,
      categoria: product.categorias
    })
  }












  populatePhotoForm(product){
    this.photoForm.patchValue({
      _id: product._id
    })
  }





    }


