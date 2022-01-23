import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { MainNavModule } from '../main-nav/main-nav.module';
import { MaterialModule } from "../material/material.module";
import { DashboardRoutingModule } from './dashboard-routing.module'


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainNavModule,
    MaterialModule,
    DashboardRoutingModule
  ],
  
})
export class DashboardModule { }
