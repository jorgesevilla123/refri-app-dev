import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../../services/clients.service";



@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  client: string;

  constructor(
    public clientService: ClientsService,
    
  ) { }

  ngOnInit(): void {

    this.clientName();
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
    this.clientService.updateClient(formData);
    setTimeout(() => {
      location.reload();
    }, 1000)


    

  }

  clientName(){
    this.client = this.clientService.clientsEditForm.get('name').value;
    
  }

}
