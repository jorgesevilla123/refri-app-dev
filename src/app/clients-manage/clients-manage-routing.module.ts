import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { ClientsMainComponent } from "./clients-main/clients-main.component";
import { SalesComponent } from "./sales/sales.component";
import { SalesClientsComponent } from "./sales-clients/sales-clients.component"
import { SalesProcessComponent } from "./sales-process/sales-process.component"
import { SalesProductSearchComponent } from "./sales-product-search/sales-product-search.component";
import { AuthGuard } from "../services/auth.guard"





const routes: Routes = [
  {path: 'ventas-y-clientes', component: SalesClientsComponent, canActivate: [AuthGuard]},
  {path: 'clientes/ventas-por-clientes', component: SalesComponent, canActivate: [AuthGuard]},
  {path: 'clientes/administrar-clientes', component: ClientsMainComponent, canActivate: [AuthGuard]},
  {path: 'detalles-clientes/:id', redirectTo: '/detalles-cliente/:id', canActivate: [AuthGuard]}, 
  {path: 'detalles-cliente/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'venta-por-cliente/:id', component: SalesProcessComponent, canActivate: [AuthGuard]},

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsManageRoutingModule { }
