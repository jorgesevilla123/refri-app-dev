import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

// env variable for the url
  suppliersUrl: string

  constructor(
    private http: HttpClient
  ) {
      this.suppliersUrl = environment.SUPPLIERS_API;
    }

    getSuppliers(): Observable<any> {
      return this.http.get(`${this.suppliersUrl}/get-suppliers`).pipe(
        map( res => {
          return res
        })
      )
      
 
    }


    AddSuppliers(supplier): Observable<any> {
      return this.http.post(`${this.suppliersUrl}/add-supplier`, supplier).pipe(
        map( res => {
          return res
        })
      )
    }



    DeleteSuppliers(supplierId): Observable<any>{
      return this.http.delete(`${this.suppliersUrl}/delete-supplier/${supplierId}`).pipe(
        map( res => {
          return res
        })
      )
    }



    UpdateSupplier(supplierId, supplierData): Observable<any>{
      return this.http.put(`${this.suppliersUrl}/update-supplier/${supplierId}`, supplierData).pipe(
        map( res => {
          return res
        })
      )
    }



    UpdateSupplierLocation(supplierId, supplierLocation): Observable<any>{
      return this.http.put(`${this.suppliersUrl}/update-supplier-location/${supplierId}`, supplierLocation).pipe(
        map( res => {
          return res
        })
      )
    }



    AddSupplierNumber(supplierId, number): Observable<any>{
      return this.http.put(`${this.suppliersUrl}/add-supplier-number/${supplierId}`, number).pipe(
        map( res => {
          return res
        })
      )
    }



    RemoveSupplierNumber(supplierId, number): Observable<any>{
      return this.http.put(`${this.suppliersUrl}/remove-supplier-number/${supplierId}`, number).pipe(
        map( res => {
          return res
        })
      )
    }



}
