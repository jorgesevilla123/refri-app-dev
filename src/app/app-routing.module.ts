import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from "./main-routes/inventory-module/inventory-table/inventory-table.component";
import { MainMenuComponent } from "./main-routes/main-menu/main-menu.component";
import { PointOfSaleComponent } from "./main-routes/point-of-sale/point-of-sale.component";
import { ConfigurationsComponent } from "./main-routes/configurations/configurations.component";
import { ProductSearchComponent } from "./main-routes/product-search/product-search.component";
import { InventoryMainComponent } from "./main-routes/inventory-module/inventory-main/inventory-main.component";
import { InventorySearchComponent } from "./main-routes/inventory-module/inventory-search/inventory-search.component";
import { SalesClientsComponent } from "./main-routes/sales-clients-module/sales-clients/sales-clients.component";
import { SalesComponent } from "./main-routes/sales-clients-module/sales/sales.component";
import { ClientsMainComponent } from "./main-routes/sales-clients-module/clients-main/clients-main.component";

//Routes to render all the views in main-routes folder
const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: MainMenuComponent},
  {path: 'inventory-table', component: InventoryComponent},
  {path: 'inventory-main', component: InventoryMainComponent},
  {path: 'inventory-search', component: InventorySearchComponent},
  {path: 'point-of-sale', component: PointOfSaleComponent},
  {path: 'sales-and-clients/sales', component: SalesComponent},
  {path: 'configurations', component: ConfigurationsComponent},
  {path: 'products-search', component: ProductSearchComponent},
  {path: 'sales-and-clients', component: SalesClientsComponent},
  {path: 'sales-and-clients/clients', component: ClientsMainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
