import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../services/clients.service";
import { MatDialogRef } from "@angular/material/dialog";



@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  client: string;

  constructor(
    public clientService: ClientsService,
    public dialogRef: MatDialogRef<ClientEditComponent>
    
  ) { }

  ngOnInit(): void {

 
  }


  onClientSubmit(){
    let id = this.clientService.clientsEditForm.get('_id').value;
    let name = this.clientService.clientsEditForm.get('name').value;
    let cedula = this.clientService.clientsEditForm.get('cedula').value;
    let email = this.clientService.clientsEditForm.get('email').value;
    let phone = this.clientService.clientsEditForm.get('phoneNumber').value;
    const formData = new FormData();
    formData.append('_id', id);
    formData.append('name', name);
    formData.append('cedula', cedula);
    formData.append('email', email);
    formData.append('phoneNumber', phone); 
    this.clientService.updateClient(formData).subscribe(
      client => {
        if(client){
          this.dialogRef.close({ clientData: client})
        }
        else {
          this.dialogRef.close({ clientData: false })
        }
        
      }
  

    ),
    error => console.log(error),
    () => {return }


    

  }

  


  onClose(){

    this.dialogRef.close({ clientData: false });

  }

}
