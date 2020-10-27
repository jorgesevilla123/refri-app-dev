import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { ClientsMainComponent } from "./clients-main/clients-main.component";






const routes: Routes = [
  {path: 'clients/:id', redirectTo: '/client/:id'},
  {path: 'client/:id', component: ClientDetailsComponent},
  {path: 'sales-and-clients/clients', component: ClientsMainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsManageRoutingModule { }
