import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";



@Component({
  selector: 'app-inventory-manage-products',
  templateUrl: './inventory-manage-products.component.html',
  styleUrls: ['./inventory-manage-products.component.css']
})
export class InventoryManageProductsComponent implements OnInit {

  constructor(
     public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

   //Dialog for adding new products
   onAdd() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(InventoryManageProductsComponent, dialogConfig);

  }

}
