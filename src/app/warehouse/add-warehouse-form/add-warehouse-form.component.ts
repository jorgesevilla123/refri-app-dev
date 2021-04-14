import { Component, OnInit } from '@angular/core';
import { WarehouseService} from "../../services/warehouse.service"
import {  MatDialogRef } from "@angular/material/dialog";
import { Warehouse } from "../../interfaces-models/warehouses"
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { title } from 'process';



@Component({
  selector: 'app-add-warehouse-form',
  templateUrl: './add-warehouse-form.component.html',
  styleUrls: ['./add-warehouse-form.component.css']
})
export class AddWarehouseFormComponent implements OnInit {

  formData: FormData = new FormData();

  constructor( 
    public warehouseService: WarehouseService,
    public dialogRef: MatDialogRef<AddWarehouseFormComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


  addWarehouse(){
    const warehouse_location = this.warehouseService.addWarehouseForm.get('warehouse_location').value;
    const warehouse_name = this.warehouseService.addWarehouseForm.get('warehouse_name').value;
    this.formData.append('warehouse_location', warehouse_location);
    this.formData.append('warehouse_name', warehouse_name);
    this.warehouseService.AddWarehouse(this.formData).subscribe(
      res => {
        this.dialogRef.close({data: res})
        this.warehouseService.warehouseForm.reset();

      },
      err => {
        console.log(err);

      },
      () => { console.log('Completed')}

    )

  }

}
