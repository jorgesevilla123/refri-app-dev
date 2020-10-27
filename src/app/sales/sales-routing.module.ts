import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from "./sales/sales.component";
import { SalesClientsComponent } from "./sales-clients/sales-clients.component"
import { SalesProcessComponent } from "./sales-process/sales-process.component"
import { SalesProductSearchComponent } from "./sales-product-search/sales-product-search.component";


const routes: Routes = [
  {path: 'sales-and-clients', component: SalesClientsComponent},
  {path: 'sales-and-clients/sales/:id', component: SalesProcessComponent},
  {path: 'sales-and-clients/sales', component: SalesComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
