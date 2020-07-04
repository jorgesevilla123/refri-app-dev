import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from "../../../services/clients.service";
import { Client } from "../../../clients";
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-sales-clients',
  templateUrl: './sales-clients.component.html',
  styleUrls: ['./sales-clients.component.css']
})
export class SalesClientsComponent implements OnInit {
@ViewChild(MatAccordion) accordion: MatAccordion
clients: Client[]

  constructor(
    private clientService: ClientsService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    )
  }

}
