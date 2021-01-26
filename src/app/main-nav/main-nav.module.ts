import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav.component'
import { MaterialModule } from '../material/material.module'
import { RouterModule } from "@angular/router"



@NgModule({
  declarations: [
    MainNavComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    MainNavComponent

  ]
})
export class MainNavModule { }
