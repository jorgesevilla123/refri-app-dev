import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";





@Component({
  selector: 'app-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.css']
})
export class InventoryMainComponent implements OnInit {
  searchKey: string

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.dialogService.open(InventoryManageProductsComponent, true, true, "40%", "auto");
   

  }

  onSearchClear() {
    this.searchKey = '';
  }

}
