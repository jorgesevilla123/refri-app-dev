import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material/material.module";
import { DialogComponent } from './reusable-components/dialogs/dialog/dialog.component';
import { LoadingComponent } from './reusable-components/loading/loading/loading.component';
import { LoadingInterceptorService } from './services/loading-interceptor.service';
import { UsersComponent } from './auth-routes/users/users.component';
import { UserSignupComponent } from './auth-routes/user-signup/user-signup.component';
import { UserLoginComponent } from './auth-routes/user-login/user-login.component';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from "./services/login.guard";
import { AuthService } from './services/auth.service';
import { InventoryModule } from "./inventory/inventory.module";
import { ClientsManageModule } from "./clients-manage/clients-manage.module";
import { MainNavModule } from './main-nav/main-nav.module';
import { DashboardModule } from "./dashboard/dashboard.module";
import { ResponsiveNavModule } from "./responsive-nav/responsive-nav.module";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductDeleteDialogComponent } from './reusable-components/product-delete-dialog/product-delete-dialog.component';
import { SalesModule } from "./sales/sales.module";
import { InventoryService } from './services/inventory.service';
import { SalesService } from './services/sales.service';







@NgModule({




  //We only declare here the component of the root app
  declarations: [
    AppComponent,
    LoadingComponent,
    UsersComponent,
    UserSignupComponent,
    UserLoginComponent,
    ProductDeleteDialogComponent
  ],







  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InventoryModule,
    ClientsManageModule,
    MainNavModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ResponsiveNavModule,
    SalesModule,
 
  


  ],


  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi : true
    },
    AuthGuard,
    LoginGuard,
    AuthService,
    InventoryService, //services on the root of the dependency injection tree
    SalesService

    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
