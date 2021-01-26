import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { ConfigurationsComponent } from "./finance/configurations.component";
import { BusinessConfigurationsService } from "../services/business-configurations.service";
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from '../main-nav/main-nav.module'



@NgModule({
  declarations: [
    ConfigurationsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FinanceRoutingModule,
    MainNavModule
  ],

  providers: [BusinessConfigurationsService]
})
export class FinanceModule { }
