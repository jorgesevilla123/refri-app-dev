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
import { ClientDetailsComponent } from "./main-routes/sales-clients-module/client-details/client-details.component";
import { SalesProcessComponent } from "./main-routes/sales-clients-module/sales-process/sales-process.component";
import { UserLoginComponent } from "./auth-routes/user-login/user-login.component";
import { UserSignupComponent } from "./auth-routes/user-signup/user-signup.component";


//Routes to render all the views in main-routes folder
const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'clients/:id', redirectTo: '/client/:id'},
  {path: 'client/:id', component: ClientDetailsComponent},
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
  {path: 'sales-and-clients/sales/:id', component: SalesProcessComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserSignupComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
