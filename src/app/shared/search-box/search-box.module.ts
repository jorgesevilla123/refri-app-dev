import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MaterialModule } from '../../material/material.module'



@NgModule({
  declarations: [
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SearchBoxComponent
  ]
})
export class SearchBoxModule { }
