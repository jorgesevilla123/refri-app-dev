import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryImageEditComponent } from "./inventory-image-edit/inventory-image-edit.component";
import { InventoryMainComponent } from "./inventory-main/inventory-main.component";
import { InventoryManageProductsComponent } from "./inventory-manage-products/inventory-manage-products.component";
import { InventoryProductEditComponent } from "./inventory-product-edit/inventory-product-edit.component";
import { InventorySearchComponent } from "./inventory-search/inventory-search.component";
import { InventoryComponent } from "./inventory-table/inventory-table.component";
import { InventoryRoutingModule } from "./inventory-routing.module";
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from "../main-nav/main-nav.module";
import { InventoryOutOfStockComponent } from './inventory-out-of-stock/inventory-out-of-stock.component';
import { InventoryLowStockComponent } from './inventory-low-stock/inventory-low-stock.component';
import { InventoryProductsToBuyComponent } from './inventory-products-to-buy/inventory-products-to-buy.component';
import { SearchComponent } from './search/search.component';
import { ResponsiveNavModule } from '../responsive-nav/responsive-nav.module';
import { LayoutModule } from '@angular/cdk/layout'
import { SharedModule } from "../shared/shared.module";
import { SearchBoxModule } from '../shared/search-box/search-box.module';
import { AlertService } from  '../shared/alert-module/alert.service';
import { ConfirmationModule } from '../shared/confirmation/confirmation.module';
import { InventoryOverviewComponent } from './inventory-overview/inventory-overview.component'



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
    InventoryOverviewComponent,

  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ResponsiveNavModule,
    MainNavModule,
    LayoutModule,
    SharedModule,
    SearchBoxModule,
    ConfirmationModule
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
    AlertService
  ]
})
export class InventoryModule { }
