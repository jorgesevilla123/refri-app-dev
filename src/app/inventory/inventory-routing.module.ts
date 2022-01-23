import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryMainComponent } from "./inventory-main/inventory-main.component";
import { InventorySearchComponent } from "./inventory-search/inventory-search.component";
import { InventoryComponent } from "./inventory-table/inventory-table.component";
import { InventoryOutOfStockComponent } from "./inventory-out-of-stock/inventory-out-of-stock.component"
import { InventoryLowStockComponent } from './inventory-low-stock/inventory-low-stock.component';
import { InventoryProductsToBuyComponent } from './inventory-products-to-buy/inventory-products-to-buy.component'
import { SearchComponent } from './search/search.component'
import { InventoryOverviewComponent } from './inventory-overview/inventory-overview.component'
import { AuthGuard } from "../services/auth.guard"





const routes: Routes = [
  {
    path: '', component: InventoryMainComponent, //this is the parent route, child routes will derive from this one 
      children: [
      {path: '', redirectTo: '/inventario/principal', pathMatch: 'full'},
      {path: 'inventario/principal', component: InventoryOverviewComponent},
      { path: 'inventario/busqueda', component: InventorySearchComponent },
      { path: 'inventario/fuera-de-stock', component: InventoryOutOfStockComponent,  /* canActivate: [AuthGuard] */ },
      { path: 'inventario/fuera-de-stock/search', component: SearchComponent,   /* canActivate: [AuthGuard] */ },
      { path: 'inventario/bajo-stock', component: InventoryLowStockComponent,  /* canActivate: [AuthGuard] */ },
      { path: 'inventario/por-pedir', component: InventoryProductsToBuyComponent,  /* canActivate: [AuthGuard] */ },
      { path: 'inventario/categorias', component: InventoryMainComponent,  /* canActivate: [AuthGuard] */ }

    ] /* canActivate: [AuthGuard] */
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
