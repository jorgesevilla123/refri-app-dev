import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesMainComponent } from './sales-main/sales-main.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSalesComponent } from './add-sales/add-sales.component';


@NgModule({
  declarations: [
    SalesMainComponent,
    AddSalesComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SalesMainComponent,
    AddSalesComponent
  ]
})
export class SalesModule { }
