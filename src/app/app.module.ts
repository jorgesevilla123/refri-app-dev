import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MainMenuComponent } from './main-routes/main-menu/main-menu.component';
import { InventoryComponent } from './main-routes/inventory-module/inventory-table/inventory-table.component';
import { FlexLayoutModule } from "@angular/flex-layout"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InventoryManageProductsComponent } from "./main-routes/inventory-module/inventory-manage-products/inventory-manage-products.component"
import { InventoryMainComponent } from "./main-routes/inventory-module/inventory-main/inventory-main.component";
import { MaterialModule } from "./material/material.module";
import { DialogComponent } from './reusable-components/dialogs/dialog/dialog.component';
import { InventoryProductEditComponent } from './main-routes/inventory-module/inventory-product-edit/inventory-product-edit.component';
import { ConfirmationComponent } from './reusable-components/confirmation/confirmation.component';
import { InventorySearchComponent } from './main-routes/inventory-module/inventory-search/inventory-search.component';
import { ConfigurationsComponent } from "./main-routes/configurations/configurations.component";
import { ProductSearchComponent } from "./main-routes/product-search/product-search.component";
import { InventoryImageEditComponent } from './main-routes/inventory-module/inventory-image-edit/inventory-image-edit.component';
import { SalesClientsComponent } from './main-routes/sales-clients-module/sales-clients/sales-clients.component';
import { ClientsMainComponent } from './main-routes/sales-clients-module/clients-main/clients-main.component';
import { ClientSearchComponent } from './main-routes/sales-clients-module/client-search/client-search.component';
import { ClientEditComponent } from './main-routes/sales-clients-module/client-edit/client-edit.component';
import { ClientDetailsComponent } from './main-routes/sales-clients-module/client-details/client-details.component';
import { SalesProcessComponent } from './main-routes/sales-clients-module/sales-process/sales-process.component';
import { SalesComponent } from "./main-routes/sales-clients-module/sales/sales.component";
import { SalesProductSearchComponent } from './main-routes/sales-clients-module/sales-product-search/sales-product-search.component';
import { LoadingComponent } from './reusable-components/loading/loading/loading.component';
import { LoadingInterceptorService } from './services/loading-interceptor.service';
import { UsersComponent } from './auth-routes/users/users.component';
import { UserSignupComponent } from './auth-routes/user-signup/user-signup.component';
import { UserLoginComponent } from './auth-routes/user-login/user-login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainMenuComponent,
    InventoryComponent,
    InventoryMainComponent,
    InventoryManageProductsComponent,
    DialogComponent,
    InventoryProductEditComponent,
    ConfirmationComponent,
    InventorySearchComponent,
    ConfigurationsComponent,
    ProductSearchComponent,
    InventoryImageEditComponent,
    SalesClientsComponent,
    ClientsMainComponent,
    ClientSearchComponent,
    ClientEditComponent,
    ClientDetailsComponent,
    SalesProcessComponent,
    SalesComponent,
    SalesProductSearchComponent,
    LoadingComponent,
    UsersComponent,
    UserSignupComponent,
    UserLoginComponent
    

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
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi : true
    },
    AuthGuard,
    AuthService


    
  ],
  bootstrap: [AppComponent],
  entryComponents:[InventoryManageProductsComponent]
})
export class AppModule { }
