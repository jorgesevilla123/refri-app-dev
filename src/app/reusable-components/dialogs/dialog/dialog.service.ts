import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MatDialogConfig, MatDialog} from "@angular/material/dialog";
import { DialogComponent } from "./dialog.component";
import { map, take } from 'rxjs/operators';
import { Client } from "../../../interfaces-models/clients";
import { Products } from "../../../interfaces-models/products";


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  
 

  //resusable dialog component
  open(component, close: boolean, autofocus: boolean, width: string, height: string, data?): Observable<any>{
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = close;
    dialogConfig.autoFocus = autofocus;
    dialogConfig.width = width;
    dialogConfig.height = height;
    dialogConfig.data = data
    const dialogRef = this.dialog.open(component, dialogConfig);

    return dialogRef.afterClosed();


  }

  
}
