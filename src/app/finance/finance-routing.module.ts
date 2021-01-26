import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationsComponent } from "./finance/configurations.component";
import { AuthGuard } from "../services/auth.guard";



const routes: Routes = [
  {path: '', component: ConfigurationsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
