import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MatDialogConfig, MatDialog} from "@angular/material/dialog";
import { DialogComponent } from "./dialog.component";
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  
 

  //resusable dialog component
  open(component, close: boolean, autofocus: boolean, width: string, height: string ){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = close;
    dialogConfig.autoFocus = autofocus;
    dialogConfig.width = width;
    dialogConfig.height = height;
    this.dialog.open(component, dialogConfig);

  }

  
}
