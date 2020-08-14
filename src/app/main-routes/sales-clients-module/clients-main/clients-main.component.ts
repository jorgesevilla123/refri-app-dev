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
  constantBuyer: boolean


  constructor(
    public clientService: ClientsService
  ) { }

  


  




  ngOnInit(): void {



    
    

  }

  


  getClients(){
    this.clientService.getClients().subscribe(
      client => this.clients = client
    )


  }

  onClientSubmit(){
    const name =  this.clientService.clientsForm.get('name').value;
    const phone = this.clientService.clientsForm.get('phoneNumber').value;
    const cedula = this.clientService.clientsForm.get('cedula').value;
    const correo = this.clientService.clientsForm.get('email').value;
    const constantBuyer = this.clientService.clientsForm.get('constantBuyer').value;
    let formData = new FormData()
    formData.append('name', name);
    formData.append('cedula', cedula);
    formData.append('email', correo);
    formData.append('phoneNumber', phone);
    formData.append('constantBuyer', constantBuyer);
    this.clientService.addClient(formData);
    setTimeout(() => {
      location.reload()
    }, 1000)
    this.clientService.clientsForm.reset();



  }


  toggle(event){
    this.clientService.clientsForm.get('constantBuyer').setValue(event.target.value);

  }






  }

