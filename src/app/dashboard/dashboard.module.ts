import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from "./main-menu.component";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainNavModule } from '../main-nav/main-nav.module';
import { MaterialModule } from "../material/material.module"
import { FlexLayoutModule } from "@angular/flex-layout"


@NgModule({
  declarations: [
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MainNavModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class DashboardModule { }
