import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../../services/clients.service";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Client } from "../../../clients";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  clients$ : Observable<Client[]>
  private searchKeys = new Subject<string>();
  

  constructor(
    private clientService: ClientsService
  ) { }



  
  
  search(term: string): void {
    this.searchKeys.next(term);

  }

  ngOnInit(): void {

    
    this.clients$ = this.searchKeys.pipe(

      //waiting 300 ms between every keystroke before considering the term
      debounceTime(1500),

      //ignore new term if it's the same as previous
      distinctUntilChanged(),

      //switch to new search observable every time the term changes

      switchMap((term: string) => this.clientService.searchClient(term),

    ))


  }






}
