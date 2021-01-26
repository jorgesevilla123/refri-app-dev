import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from "./auth-routes/user-login/user-login.component";
import { UserSignupComponent } from "./auth-routes/user-signup/user-signup.component";
import { AuthGuard } from "./services/auth.guard";
import { LoadPermissionGuard } from "./services/load-permission.guard"
import { LoginGuard } from './services/login.guard';


//Routes to render all the views in main-routes folder
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/dashboard'},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserSignupComponent},
  {path: 'inventario', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)},
  {path: 'finanzas', loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)},
  {path: 'clientes', loadChildren: () => import('./clients-manage/clients-manage.module').then(m => m.ClientsManageModule)},






];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'top'
}),

],
  exports: [RouterModule]
})
export class AppRoutingModule { }
