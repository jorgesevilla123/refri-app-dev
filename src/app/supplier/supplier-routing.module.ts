import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersMainComponent } from "./suppliers-main/suppliers-main.component";

const routes: Routes = [
  {path: '', component: SuppliersMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
