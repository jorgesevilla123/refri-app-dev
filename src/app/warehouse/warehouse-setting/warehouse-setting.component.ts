import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Warehouse } from 'src/app/interfaces-models/warehouses';
import { WarehouseService } from "../../services/warehouse.service";
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup } from "@angular/forms"


@Component({
  selector: 'app-warehouse-setting',
  templateUrl: './warehouse-setting.component.html',
  styleUrls: ['./warehouse-setting.component.css']
})
export class WarehouseSettingComponent implements OnInit {

  warehouse: Warehouse

  constructor(
    public warehouseService: WarehouseService,
    public dialogRef: MatDialogRef<WarehouseSettingComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA)  public data: Warehouse
    
    

  ) {
    this.warehouse = this.data
   }

  ngOnInit(): void {

  }


  updateWarehouse() {
    const name =  this.warehouseService.warehouseForm.get('warehouse_name').value;
    const location = this.warehouseService.warehouseForm.get('warehouse_location').value;
    const formData = new FormData();
    formData.append('warehouse_name', name);
    formData.append('warehouse_location', location);
    this.warehouseService.UpdateWarehouse(this.warehouse._id, formData).subscribe(
      warehouse => {
        this.dialogRef.close({ data: warehouse})
      }
    )
  }

}
