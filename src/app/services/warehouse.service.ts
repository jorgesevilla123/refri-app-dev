import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from  "../../environments/environment";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  // env variable for warehouse url 
  warehouseUrl: string

  constructor(
    private http : HttpClient
  ) {
      this.warehouseUrl = environment.WAREHOUSE_API;
    }



    getWarehouse(): Observable<any>{
      return this.http.get(`${this.warehouseUrl}/get-warehouses`).pipe(
        map( res => {
          return res
        })
      )
    }

    
    AddWarehouse(product): Observable<any> {
    return this.http.post(`${this.warehouseUrl}/add-warehouse`, product).pipe(
        map( res => {
          return res
        })
      )
      
    }



    AddProductToWarehouse(warehouseId, product): Observable<any>{
      return this.http.put(`${this.warehouseUrl}/add-product/${warehouseId}`, product).pipe(
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


   













}
