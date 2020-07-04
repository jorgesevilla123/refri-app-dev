import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Client } from "../clients";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private ClientsUrl = 'http://localhost:4200/api/clients';

  constructor(
    private http: HttpClient
  ) { }


  getClients(){
    return this.http.get<Client[]>(`${this.ClientsUrl}/getClients`).pipe();

  }
}
