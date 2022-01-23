import { Component, OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { InventoryService } from '../../../services/inventory.service'


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  templateData: any 

 
  


  constructor(
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data

  ) { 

    this.templateData = this.data

  }


  ngOnInit(): void {
    this.message('Estas seguro que quieres eliminar este producto?', 'delete')

    

  
  }

  message(message: string, icon: string){
    
    document.getElementById('title').innerText = message;
    document.getElementById('icon').innerText = icon
   
  }


  onDelete(){
    console.log(this.templateData);
    this.inventoryService.deleteProduct(this.templateData).subscribe(
      product => {
        this.dialogRef.close({ data: {product, deleted: true}})
      }
    )
  }


  onClose(){
    console.log('on close ');
    this.dialogRef.close({data: {deleted: false}})
  }



  ngOnDestroy(){
    console.log('component destroyed');
  }




}
