import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../../services/clients.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { Client } from "../../../clients";
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";
import { ClientEditComponent } from "../client-edit/client-edit.component";
import { AlertService } from "../../../reusable-components/alerts/alert/alert.service";




@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit {
  clients$ : Observable<Client[]>
  private searchKeys = new Subject<string>();

  constructor(
    public clientService : ClientsService,
    public dialog : DialogService,
    public alertService: AlertService,
    

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


  onEditClient(client: Client){
    this.clientService.populateForm(client);
    this.dialog.open(ClientEditComponent, true, true, "40%", "auto");

  }


  deleteClient(client: Client){
    this.clientService.deleteClient(client);
    this.alertService.notify("Cliente eliminado");
    setTimeout( () => {
      location.reload();
    }, 1000);
    
    
  }












  

}
