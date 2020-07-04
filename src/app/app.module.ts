import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MainMenuComponent } from './main-routes/main-menu/main-menu.component';
import { InventoryComponent } from './main-routes/inventory-module/inventory-table/inventory-table.component';
import { FlexLayoutModule } from "@angular/flex-layout"
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InventoryManageProductsComponent } from "./main-routes/inventory-module/inventory-manage-products/inventory-manage-products.component"
import { InventoryMainComponent } from "./main-routes/inventory-module/inventory-main/inventory-main.component";
import { MaterialModule } from "./material/material.module";
import { DialogComponent } from './reusable-components/dialogs/dialog/dialog.component';
import { InventoryProductEditComponent } from './main-routes/inventory-module/inventory-product-edit/inventory-product-edit.component';
import { ConfirmationComponent } from './reusable-components/confirmation/confirmation.component';
import { InventorySearchComponent } from './main-routes/inventory-module/inventory-search/inventory-search.component';
import { ConfigurationsComponent } from "./main-routes/configurations/configurations.component";
import { ProductSearchComponent } from "./main-routes/product-search/product-search.component";
import { InventoryImageEditComponent } from './main-routes/inventory-module/inventory-image-edit/inventory-image-edit.component';
import { SalesClientsComponent } from './main-routes/sales-clients-module/sales-clients/sales-clients.component';
import { ClientsMainComponent } from './main-routes/sales-clients-module/clients-main/clients-main.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainMenuComponent,
    InventoryComponent,
    InventoryMainComponent,
    InventoryManageProductsComponent,
    DialogComponent,
    InventoryProductEditComponent,
    ConfirmationComponent,
    InventorySearchComponent,
    ConfigurationsComponent,
    ProductSearchComponent,
    InventoryImageEditComponent,
    SalesClientsComponent,
    ClientsMainComponent
    

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[InventoryManageProductsComponent]
})
export class AppModule { }
