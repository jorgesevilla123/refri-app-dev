import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Client } from "../interfaces-models/clients";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Products } from '../interfaces-models/products';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  //env variable for api
  private ClientsUrl: string

  constructor(
    private http: HttpClient
  ) {

    this.ClientsUrl = environment.CLIENTS_API

 
   }



  clientsEditForm: FormGroup = new FormGroup({
    _id: new FormControl(),
    name: new FormControl(),
    cedula: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    constantBuyer: new FormControl()

  })

  clientsForm: FormGroup = new FormGroup({
    name: new FormControl(),
    cedula: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    constantBuyer: new FormControl(false)


  })


  getClients(){
    return this.http.get<Client[]>(`${this.ClientsUrl}/getClients`).pipe();
  }



  getOneClient(id: string | number): Observable<Client>{
    const url = `${this.ClientsUrl}/loadClient/${id}`;
    return this.http.get<Client>(url).pipe(
      map(res => {return res})
    )

  }

  addClient(formData: FormData): Observable<Client>{
    return this.http.post<Client>(`${this.ClientsUrl}/addClient`, formData).pipe(
      map( res => {return res})
    )
  }

  updateClient(client: FormData): Observable<Client>{
    const id = client.get('_id');
    const url = `${this.ClientsUrl}/updateClient/${id}`;
    return this.http.put<Client>(url, client).pipe(
      map(res => {return res})
    )
  }



  deleteClient(client: Client | string): Observable<Client>{
    const id = typeof client === 'string' ? client : client._id;
    const url = `${this.ClientsUrl}/deleteClient/${id}`;
    return this.http.delete<Client>(url).pipe(
      map(res => {return res})
    )
  }




  searchEntries(keyLetter) {
    if(!keyLetter.trim()){
      return of([]);
    }
    else{
    return this.http.get(`${this.ClientsUrl}/searchClient?name=${keyLetter}`).pipe(
      map( res => {return res})
    )
 

  }
  }


  searchClient(keyLetter): Observable<Client[]>{


    return keyLetter.pipe(

      debounceTime(1500),

      distinctUntilChanged(),

      switchMap( term => this.searchEntries(term))

    )
  }


  populateForm(client: Client){
    this.clientsEditForm.patchValue({
      _id: client._id,
      name: client.name,
      cedula: client.cedula,
      email: client.email,
      phoneNumber: client.phoneNumber
    })
  }

  buyProduct(client, product): Observable<Products[]>{
    console.log(product);
    const id = client._id
    const url = `${this.ClientsUrl}/buyProduct/${id}`;
    return this.http.post<Products[]>(url, product).pipe(
      map( res => {return res})
    )


  }

  addToCart(client, product): Observable<Client>{
    const id = client._id
    const url = `${this.ClientsUrl}/addToCart/${id}`;
    return this.http.post<Client>(url, product);

  }

  removeFromCart(client, product): Observable<Client>{
    const ClientId = client._id;
    const ProductId = product._id;
    const url = `${this.ClientsUrl}/removeFromCart/${ClientId}/${ProductId}`;
    return this.http.delete<Client>(url);
  }

  clearCart(client): Observable<Client>{
    const ClientId = client._id;
    const url = `${this.ClientsUrl}/clearCart/${ClientId}`;
    return this.http.delete<Client>(url);
  }





  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
