import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module'
import { RouterModule } from "@angular/router"
import { ResponsiveNavComponent} from './responsive-nav.component'


@NgModule({
  declarations: [
    ResponsiveNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule

  ],
  exports: [
    ResponsiveNavComponent
  ]
})
export class ResponsiveNavModule { }
