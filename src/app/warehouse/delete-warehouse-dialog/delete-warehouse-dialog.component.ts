import { Component, OnInit, Inject } from '@angular/core';
import { WarehouseService } from '../../services/warehouse.service';
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Warehouse } from "../../interfaces-models/warehouses"

@Component({
  selector: 'app-delete-warehouse-dialog',
  templateUrl: './delete-warehouse-dialog.component.html',
  styleUrls: ['./delete-warehouse-dialog.component.css']
})
export class DeleteWarehouseDialogComponent implements OnInit {

  warehouse: Warehouse

  constructor(
    private warehouseService: WarehouseService,
    public dialogRef: MatDialogRef<DeleteWarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: Warehouse
  ) {
    this.warehouse = this.data
   }

  ngOnInit(): void {
  }


  deleteWarehouse(){
    this.warehouseService.DeleteWarehouse(this.warehouse._id).subscribe(
      warehouse => {
        this.dialogRef.close({ data: warehouse})
      }
    )
  }


  cancelDelete(){

  }


}
