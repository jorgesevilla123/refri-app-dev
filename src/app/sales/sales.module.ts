import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from "./sales/sales.component";
import { SalesClientsComponent } from "./sales-clients/sales-clients.component"
import { SalesProcessComponent } from "./sales-process/sales-process.component"
import { SalesProductSearchComponent } from "./sales-product-search/sales-product-search.component";



@NgModule({
  declarations: [
    SalesComponent,
    SalesClientsComponent,
    SalesProcessComponent,
    SalesProductSearchComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
