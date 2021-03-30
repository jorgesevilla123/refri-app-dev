import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseMainComponent } from './warehouse-main/warehouse-main.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from "../main-nav/main-nav.module";



@NgModule({
  declarations: [WarehouseMainComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavModule
  ]
})
export class WarehouseModule { }
