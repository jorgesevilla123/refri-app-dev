import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseMainComponent } from './warehouse-main/warehouse-main.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from "../main-nav/main-nav.module";
import { AddWarehouseFormComponent } from './add-warehouse-form/add-warehouse-form.component';
import { DeleteWarehouseDialogComponent } from './delete-warehouse-dialog/delete-warehouse-dialog.component';
import { WarehouseSettingComponent } from './warehouse-setting/warehouse-setting.component';
import { WarehouseManageComponent } from './warehouse-manage/warehouse-manage.component';
import { WarehouseSearchComponent } from './warehouse-search/warehouse-search.component';



@NgModule({
  declarations: [WarehouseMainComponent, AddWarehouseFormComponent, DeleteWarehouseDialogComponent, WarehouseSettingComponent, WarehouseManageComponent, WarehouseSearchComponent],
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
