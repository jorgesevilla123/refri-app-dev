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
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from "../main-nav/main-nav.module";
import { InventoryOutOfStockComponent } from './inventory-out-of-stock/inventory-out-of-stock.component';
import { InventoryLowStockComponent } from './inventory-low-stock/inventory-low-stock.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InventoryProductsToBuyComponent } from './inventory-products-to-buy/inventory-products-to-buy.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    InventoryImageEditComponent,
    InventoryMainComponent,
    InventoryManageProductsComponent,
    InventoryProductEditComponent,
    InventorySearchComponent,
    InventoryComponent,
    InventoryOutOfStockComponent,
    InventoryLowStockComponent,
    InventoryProductsToBuyComponent,
    SearchComponent,
  ],
  imports: [
    InventoryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MainNavModule,
    FlexLayoutModule,
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
