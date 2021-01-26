import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../services/clients.service";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Client } from "../../interfaces-models/clients";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  clients : Client[]
  public searchKeys$ = new Subject<string>();
  

  constructor(
    private clientService: ClientsService
  ) { }



  


  ngOnInit(): void {

    this.clientService.searchClient(this.searchKeys$).subscribe(
      clients => this.clients = clients
    )

    

  }






}
