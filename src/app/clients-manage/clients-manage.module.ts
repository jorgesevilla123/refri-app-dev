import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsManageRoutingModule } from './clients-manage-routing.module';
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { ClientEditComponent } from "./client-edit/client-edit.component";
import { ClientSearchComponent } from "./client-search/client-search.component";
import { ClientsMainComponent } from "./clients-main/clients-main.component";
import { SalesComponent } from "./sales/sales.component";
import { SalesClientsComponent } from "./sales-clients/sales-clients.component"
import { SalesProcessComponent } from "./sales-process/sales-process.component"
import { SalesProductSearchComponent } from "./sales-product-search/sales-product-search.component";
import { ClientsService } from "../services/clients.service";
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from "../main-nav/main-nav.module"



@NgModule({
  declarations: [
    ClientDetailsComponent,
    ClientEditComponent,
    ClientSearchComponent,
    ClientsMainComponent,
    SalesComponent,
    SalesClientsComponent,
    SalesProcessComponent,
    SalesProductSearchComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClientsManageRoutingModule,
    MainNavModule
  ],

  providers: [ClientsService]
})
export class ClientsManageModule { }
