import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesMainComponent } from './sales-main/sales-main.component';
import { AddSalesComponent } from './add-sales/add-sales.component'


const routes: Routes = [
  {path: '', component: SalesMainComponent},
  {path: 'ventas/hacer-venta', component: AddSalesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
