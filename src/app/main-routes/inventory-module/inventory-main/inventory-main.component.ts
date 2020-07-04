import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";
import { InventoryService } from "../../../services/inventory.service";
import { Products } from "../../../products";



@Component({
  selector: 'app-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.css']
})
export class InventoryMainComponent implements OnInit {
  searchKey: string
  products: Products[]


  constructor(private dialogService: DialogService,
    public inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getProducts();
    
  }

  onAdd() {
    this.dialogService.open(InventoryManageProductsComponent, true, true, "40%", "auto");

   

  }

  onSearchClear() {
    this.searchKey = '';
  }

  getProducts(): void {
    this.inventoryService.getProducts()
    .subscribe(products => this.products = products);

  }

}
