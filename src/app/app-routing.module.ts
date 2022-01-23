import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from "./auth-routes/user-login/user-login.component";
import { UserSignupComponent } from "./auth-routes/user-signup/user-signup.component";
import { AuthGuard } from "./services/auth.guard";
import { LoadPermissionGuard } from "./services/load-permission.guard"
import { LoginGuard } from './services/login.guard';
import { DashboardComponent } from './dashboard/dashboard.component'


//Routes to render all the views in main-routes folder
const routes: Routes = [
  {path: '',  redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserSignupComponent},
  {path: 'inventario', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)},
  {path: 'clientes', loadChildren: () => import('./clients-manage/clients-manage.module').then(m => m.ClientsManageModule)},
  {path: 'ventas', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)},
 






];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'top',
    relativeLinkResolution: 'legacy'
}),

],
  exports: [RouterModule]
})
export class AppRoutingModule { }
