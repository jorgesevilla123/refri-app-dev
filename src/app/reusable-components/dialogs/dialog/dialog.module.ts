import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from "./dialog.service";
import { DialogComponent } from "./dialog.component";



@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule
  ],
  exports: [DialogComponent],
   providers: [DialogService]
  
})
export class DialogModule { }
