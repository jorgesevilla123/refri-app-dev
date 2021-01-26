import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from "@angular/flex-layout"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material/material.module";
import { DialogComponent } from './reusable-components/dialogs/dialog/dialog.component';
import { ConfirmationComponent } from './reusable-components/confirmation/confirmation.component';
import { LoadingComponent } from './reusable-components/loading/loading/loading.component';
import { LoadingInterceptorService } from './services/loading-interceptor.service';
import { UsersComponent } from './auth-routes/users/users.component';
import { UserSignupComponent } from './auth-routes/user-signup/user-signup.component';
import { UserLoginComponent } from './auth-routes/user-login/user-login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from "./services/login.guard";
import { AuthService } from './services/auth.service';
import { InventoryModule } from "./inventory/inventory.module";
import { ClientsManageModule } from "./clients-manage/clients-manage.module";
import { FinanceModule } from "./finance/finance.module";
import { MainNavModule } from './main-nav/main-nav.module';
import { DashboardModule } from "./dashboard/dashboard.module";






@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ConfirmationComponent,
    LoadingComponent,
    UsersComponent,
    UserSignupComponent,
    UserLoginComponent,
    

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InventoryModule,
    ClientsManageModule,
    FinanceModule,
    MainNavModule,
    DashboardModule
  


  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi : true
    },
    AuthGuard,
    LoginGuard,
    AuthService


    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
