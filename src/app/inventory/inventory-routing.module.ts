import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryMainComponent } from "./inventory-main/inventory-main.component";
import { InventorySearchComponent } from "./inventory-search/inventory-search.component";
import { InventoryComponent } from "./inventory-table/inventory-table.component";





const routes: Routes = [
  {path: 'inventory-main', component: InventoryMainComponent},
  {path: 'inventory-search', component: InventorySearchComponent},
  {path: 'inventory-table', component: InventoryComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
