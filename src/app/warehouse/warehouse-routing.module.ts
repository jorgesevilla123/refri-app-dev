import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseMainComponent } from './warehouse-main/warehouse-main.component'

const routes: Routes = [
  {path: '', component: WarehouseMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
