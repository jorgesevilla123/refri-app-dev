import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { UserLoginComponent } from "./auth-routes/user-login/user-login.component";
import { UserSignupComponent } from "./auth-routes/user-signup/user-signup.component";
import { AuthGuard } from "./services/auth.guard";
import { LoadPermissionGuard } from "./services/load-permission.guard"


//Routes to render all the views in main-routes folder
const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: UserLoginComponent, canLoad: [LoadPermissionGuard] },
  {path: 'signup', component: UserSignupComponent},
  
  {path: 'dashboard', pathMatch: 'full', component: MainMenuComponent, canActivate: [AuthGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
}),

],
  exports: [RouterModule]
})
export class AppRoutingModule { }
