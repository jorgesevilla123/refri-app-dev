import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseMainComponent } from './warehouse-main/warehouse-main.component';
import { WarehouseSettingComponent } from "./warehouse-setting/warehouse-setting.component";
import { WarehouseManageComponent } from "./warehouse-manage/warehouse-manage.component"
import { WarehouseSearchComponent } from "./warehouse-search/warehouse-search.component";

const routes: Routes = [
  {path: '', component: WarehouseMainComponent},
  {path: 'almacenes/administrar-almacen/:id/:name?', component: WarehouseManageComponent},
  {path: 'almacenes/administrar-almacen/busqueda/:id/:name?', component: WarehouseSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
