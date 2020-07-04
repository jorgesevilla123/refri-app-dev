import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../../services/clients.service";
import { Client } from "../../../clients";

@Component({
  selector: 'app-clients-main',
  templateUrl: './clients-main.component.html',
  styleUrls: ['./clients-main.component.css']
})
export class ClientsMainComponent implements OnInit {
  clients: Client[]

  constructor(
    private clientService: ClientsService
  ) { }

  ngOnInit(): void {
    this.getClients()
  }


  getClients(){
    this.clientService.getClients().subscribe(
      client => this.clients = client
    )


  }

}
