import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseMainComponent } from './warehouse-main/warehouse-main.component';
import { WarehouseSettingComponent } from "./warehouse-setting/warehouse-setting.component";
import { WarehouseManageComponent } from "./warehouse-manage/warehouse-manage.component"
import { WarehouseSearchComponent } from "./warehouse-search/warehouse-search.component";
import { WarehouseProductsAddComponent } from "./warehouse-products-add/warehouse-products-add.component";

const routes: Routes = [
  {path: '', component: WarehouseMainComponent},
  {path: 'almacenes/administrar-almacen/:id/:name?', component: WarehouseManageComponent},
  {path: 'almacenes/administrar-almacen/busqueda/:id/:name?', component: WarehouseSearchComponent},
  {path: 'almacenes/agregar-producto/:id/:name?', component: WarehouseProductsAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
