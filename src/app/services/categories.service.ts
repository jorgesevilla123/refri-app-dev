import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categories } from '../interfaces-models/categories'
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  cateegories: Categories[]
  categoriesUrl: string






  constructor(
    private http: HttpClient
  ) { 

    this.categoriesUrl = environment.CATEGORY_API;


  }


  getCategories() : Observable<Categories[]>{
    return this.http.get<Categories[]>(`${this.categoriesUrl}/get-categories`).pipe(
      map(categories => { return categories})
    )

    
  }

 







}
