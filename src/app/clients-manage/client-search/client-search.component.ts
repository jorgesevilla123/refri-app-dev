import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../services/clients.service";
import { Observable, Subject } from "rxjs";
import { Client } from "../../interfaces-models/clients";
import { ClientEditComponent } from "../client-edit/client-edit.component";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";





@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit {
  clients : Client[]
  public searchKeys$ = new Subject<string>();

  constructor(
    public clientService : ClientsService,
    public alert: AlertService,
    public dialog: MatDialog
    

  ) { }


  
  


  ngOnInit(): void {

    this.clientService.searchClient(this.searchKeys$).subscribe(
      client => this.clients = client
    )





    
  }


  onEditClient(clientChosed: Client){
    this.clientService.populateForm(clientChosed);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    const dialogRef = this.dialog.open(ClientEditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      client => {
      
        if(client.clientData.name === clientChosed.name && client.clientData.cedula === clientChosed.cedula && client.clientData.email === clientChosed.email
          && client.clientData.phoneNumber === clientChosed.phoneNumber) {
          this.alert.notifySuccess('No se ha editado el cliente', 2500, 'top', 'center')
          }
        
        else {
          this.alert.notifySuccess('Cliente editado', 2500, 'top', 'center')
          setTimeout(() => {
            location.reload()
          }, 2000)
        }
      }

    )


  }


  deleteClient(client: Client){
    this.clientService.deleteClient(client).subscribe(
      client => {
        if(client) {
          this.alert.notifySuccess('Cliente borrado', 2500, 'top', 'center')
          setTimeout( () => {
            location.reload()
          }, 2000)
        }
        else {
          this.alert.notifyWarn('No se borrado el cliente', 2500, 'top', 'center')
        }
      }
    )

  }












  

}
