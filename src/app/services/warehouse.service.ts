import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from  "../../environments/environment";
import { map } from "rxjs/operators";
import {  FormControl, FormGroup } from "@angular/forms";
import {  Warehouse } from "../interfaces-models/warehouses"


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  // env variable for warehouse url 
  warehouseUrl: string
  warehouse: Warehouse
  constructor(
    private http : HttpClient
  ) {
      this.warehouseUrl = environment.WAREHOUSE_API;
    }


    warehouseForm: FormGroup = new FormGroup({
      _id: new FormControl(),
      warehouse_location: new FormControl(),
      warehouse_name: new FormControl(),
    })

    addWarehouseForm: FormGroup = new FormGroup({
      _id: new FormControl(),
      warehouse_location: new FormControl(),
      warehouse_name: new FormControl()
    })



    getWarehouse(): Observable<any>{
      return this.http.get(`${this.warehouseUrl}/get-warehouses`).pipe(
        map( res => {
          return res
        })
      )
    }



    
    getOneWarehouse(warehouseId, page: number): Observable<any>{
      return this.http.get(`${this.warehouseUrl}/get-one-warehouse/${warehouseId}?page=${page}`).pipe(
        map( res => {
          return res
        })
      )
    }


    searchWarehouseProducts(id, keyLetter, page): Observable<any>{
        return this.http.get<any>(`${this.warehouseUrl}/search-products-warehouse/${id}?q=${keyLetter}&page=${page}`).pipe(
          map(
            res => {
              return res
            }
          )
        )
      
    }


    
    AddWarehouse(product): Observable<any> {
    return this.http.post(`${this.warehouseUrl}/add-warehouse`, product).pipe(
        map( res => {
          return res
        })
      )
    }



<<<<<<< HEAD
    AddProductToWarehouse(warehouseId, products): Observable<any>{
      console.log(products)
      return this.http.put(`${this.warehouseUrl}/add-product/${warehouseId}`, products).pipe(
=======
    AddProductToWarehouse(warehouseId, product): Observable<any>{
      console.log(product);
      return this.http.put(`${this.warehouseUrl}/add-product/${warehouseId}`, product).pipe(
>>>>>>> ed9a9d52b62d7a83dde338c9124c24e4a762cf82
      map( res => {
          return res
        })
      )
    }


    AddAllProductsToWarehouse(warehouseId, product): Observable<any>{
      return this.http.put(`${this.warehouseUrl}/add-all-products/${warehouseId}`, product).pipe(
        map( res => {
          return res
        })
      )
    }


    DeleteWarehouse(warehouseId): Observable<any>{
      return this.http.delete(`${this.warehouseUrl}/delete-warehouse/${warehouseId}`).pipe(
        map( res => {
          return res
        })
      )
    }


    RemoveAllProductsFromWarehouse(warehouseId): Observable<any>{
      return this.http.delete(`${this.warehouseUrl}/remove-all-products/${warehouseId}`).pipe(
        map( res => {
          return res
        })
      )
    }


    RemoveOneProductFromWarehouse(warehouseId): Observable<any>{
      return this.http.delete(`${this.warehouseUrl}/delete-product/${warehouseId}`).pipe(
        map( res => {
          return res
        })
      )
    }


    UpdateWarehouse(warehouseId, product): Observable<any>{
      return this.http.put(`${this.warehouseUrl}/update-warehouse/${warehouseId}`, product).pipe(
        map( res => {
          return res
        })
      ) 

    }


   

    populateForm(warehouse: Warehouse){
      this.warehouseForm.patchValue({
        _id: warehouse._id,
        warehouse_location: warehouse.warehouse_location,
        warehouse_name: warehouse.warehouse_name
      })

    }











}
