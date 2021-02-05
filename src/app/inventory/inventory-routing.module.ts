import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryMainComponent } from "./inventory-main/inventory-main.component";
import { InventorySearchComponent } from "./inventory-search/inventory-search.component";
import { InventoryComponent } from "./inventory-table/inventory-table.component";
import { InventoryOutOfStockComponent } from "./inventory-out-of-stock/inventory-out-of-stock.component"
import { InventoryLowStockComponent } from './inventory-low-stock/inventory-low-stock.component';
import { InventoryProductsToBuyComponent } from './inventory-products-to-buy/inventory-products-to-buy.component'
import { SearchComponent } from './search/search.component'
import { AuthGuard } from "../services/auth.guard"





const routes: Routes = [
{path: '', component: InventoryMainComponent,   /* canActivate: [AuthGuard] */ },
{path: 'inventario/busqueda', component: InventorySearchComponent,   /* canActivate: [AuthGuard] */ },
{path: 'inventario/tabla', component: InventoryComponent,  /*  canActivate: [AuthGuard] */},
{path: 'inventario/fuera-de-stock', component: InventoryOutOfStockComponent,  /* canActivate: [AuthGuard] */ },
{path: 'inventario/fuera-de-stock/search', component: SearchComponent,   /* canActivate: [AuthGuard] */},
  {path: 'inventario/bajo-stock', component: InventoryLowStockComponent,  /* canActivate: [AuthGuard] */ },
{path: 'inventario/por-pedir', component: InventoryProductsToBuyComponent,  /* canActivate: [AuthGuard] */},
{path: 'inventario/categorias', component: InventoryMainComponent,  /* canActivate: [AuthGuard] */}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
