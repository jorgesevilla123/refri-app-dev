import { Component, OnInit, Inject } from '@angular/core';
import { WarehouseService } from "../../services/warehouse.service";
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css']
})
export class ProductDeleteDialogComponent implements OnInit {


  dataObject: any


  constructor(
    public warehouseService: WarehouseService,
    public dialogRef: MatDialogRef<ProductDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.dataObject = this.data
  }

  ngOnInit(): void {
  }






  deleteWarehouseProduct(){
    this.warehouseService.RemoveOneProductFromWarehouse(this.dataObject.warehouseId, this.dataObject.product._id).subscribe(
      product => {
        this.dialogRef.close({data: product})
      },
      err => {
        console.log(err)
      }
    )
  }
}
