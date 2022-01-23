import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from '../services/auth.guard';


const DashboardRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
