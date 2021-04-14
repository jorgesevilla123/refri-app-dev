import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SuppliersMainComponent } from './suppliers-main/suppliers-main.component';


@NgModule({
  declarations: [SuppliersMainComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
