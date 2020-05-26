import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from "./main-routes/inventory/inventory.component";
import { MainMenuComponent } from "./main-routes/main-menu/main-menu.component";
import { PointOfSaleComponent } from "./main-routes/point-of-sale/point-of-sale.component";
import { ConfigurationsComponent } from "./main-routes/configurations/configurations.component";
import { ProductSearchComponent } from "./main-routes/product-search/product-search.component";
import { QuickConfigurationComponent } from "./main-routes/quick-configuration/quick-configuration.component";
import { EditInventoryComponent } from "./main-routes/edit-inventory/edit-inventory.component";
import { SalesComponent } from "./main-routes/sales/sales.component";
import { SearchBySpecificationComponent } from "./main-routes/search-by-specification/search-by-specification.component";

//Routes to render all the views in main-routes folder
const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: MainMenuComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'edit-inventory', component: EditInventoryComponent},
  {path: 'point-of-sale', component: PointOfSaleComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'configurations', component: ConfigurationsComponent},
  {path: 'quick-configurations', component: QuickConfigurationComponent},
  {path: 'products-search', component: ProductSearchComponent},
  {path: 'search-by-specification', component: SearchBySpecificationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
