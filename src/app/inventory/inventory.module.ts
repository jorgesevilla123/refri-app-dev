import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryImageEditComponent } from "./inventory-image-edit/inventory-image-edit.component";
import { InventoryMainComponent } from "./inventory-main/inventory-main.component";
import { InventoryManageProductsComponent } from "./inventory-manage-products/inventory-manage-products.component";
import { InventoryProductEditComponent } from "./inventory-product-edit/inventory-product-edit.component";
import { InventorySearchComponent } from "./inventory-search/inventory-search.component";
import { InventoryComponent } from "./inventory-table/inventory-table.component";
import { InventoryRoutingModule } from "./inventory-routing.module";
import { InventoryService } from "../services/inventory.service"

@NgModule({
  declarations: [
    InventoryImageEditComponent,
    InventoryMainComponent,
    InventoryManageProductsComponent,
    InventoryProductEditComponent,
    InventorySearchComponent,
    InventoryComponent
  ],
  imports: [
    InventoryRoutingModule,
    CommonModule
  ],
  exports: [
    InventoryImageEditComponent,
    InventoryMainComponent,
    InventoryManageProductsComponent,
    InventoryProductEditComponent,
    InventorySearchComponent,
    InventoryComponent
  ],

  providers: [
    InventoryService
  ]
})
export class InventoryModule { }
