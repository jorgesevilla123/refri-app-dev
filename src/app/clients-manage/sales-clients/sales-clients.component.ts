import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from "../../services/clients.service";
import { Client } from "../../interfaces-models/clients";
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-sales-clients',
  templateUrl: './sales-clients.component.html',
  styleUrls: ['./sales-clients.component.css']
})
export class SalesClientsComponent implements OnInit {
@ViewChild(MatAccordion) accordion: MatAccordion


  constructor(
    private clientService: ClientsService
  ) { }

  ngOnInit(): void {
 
  }



}
