import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsManageRoutingModule } from './clients-manage-routing.module';
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { ClientEditComponent } from "./client-edit/client-edit.component";
import { ClientSearchComponent } from "./client-search/client-search.component";
import { ClientsMainComponent } from "./clients-main/clients-main.component";




@NgModule({
  declarations: [
    ClientDetailsComponent,
    ClientEditComponent,
    ClientSearchComponent,
    ClientsMainComponent
  ],
  imports: [
    CommonModule,
    ClientsManageRoutingModule
  ]
})
export class ClientsManageModule { }
