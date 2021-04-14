import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseMainComponent } from './warehouse-main/warehouse-main.component';
import { WarehouseSettingComponent } from "./warehouse-setting/warehouse-setting.component";
import { WarehouseManageComponent } from "./warehouse-manage/warehouse-manage.component"

const routes: Routes = [
  {path: '', component: WarehouseMainComponent},
  {path: 'almacenes/administrar-almacen/:id/:name?', component: WarehouseManageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
