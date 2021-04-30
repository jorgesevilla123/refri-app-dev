import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbuttonDirective } from "../directives/backbutton.directive";



@NgModule({
  declarations: [BackbuttonDirective],
  exports: [BackbuttonDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
