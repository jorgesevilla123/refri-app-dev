import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from "./main-menu.component";
import { AuthGuard } from '../services/auth.guard';


const routes: Routes = [
  {path: '', component: MainMenuComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
