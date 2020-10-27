import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../services/clients.service";
import { Client } from "../../interfaces-models/clients";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service"


@Component({
  selector: 'app-clients-main',
  templateUrl: './clients-main.component.html',
  styleUrls: ['./clients-main.component.css']
})
export class ClientsMainComponent implements OnInit {
  clients: Client[]
  constantBuyer: boolean


  constructor(
    public clientService: ClientsService,
    public alert: AlertService
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
    this.clientService.addClient(formData).subscribe(
      client => {
        if(client) {
          this.alert.notifySuccess(`Cliente añadido`, 2500, 'top', 'center');
          setTimeout(() => {
            location.reload()
          }, 2000)
          this.clientService.clientsForm.reset();


        }
        else {
          this.alert.notifyWarn(`No se agrego ningun cliente`, 2500, 'top', 'center');
        }
      }

    )
    



  }


  toggle(event){
    this.clientService.clientsForm.get('constantBuyer').setValue(event.target.value);

  }






  }

