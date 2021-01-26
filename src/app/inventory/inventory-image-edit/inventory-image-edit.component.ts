import { Component, OnInit, Optional, Inject } from '@angular/core';
import { InventoryService } from "../../services/inventory.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Products } from "../../interfaces-models/products";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";



@Component({
  selector: 'app-inventory-image-edit',
  templateUrl: './inventory-image-edit.component.html',
  styleUrls: ['./inventory-image-edit.component.css']
})
export class InventoryImageEditComponent implements OnInit {
  product: Products


  imagePath;

  constructor(
    public inventoryService: InventoryService,
    public dialogRef: MatDialogRef<InventoryImageEditComponent>,
    public alert: AlertService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Products
    ) { 
      this.product = this.data
    }


  

  ngOnInit(): void {
  }


  editPhoto(){
    const formData = new FormData();
    let id = this.inventoryService.photoForm.get('_id').value;
    formData.append('_id', id)
    formData.append('newImage', this.imagePath);
    this.inventoryService.editProductPhoto(formData).subscribe(
      product => {
        if(product) {
          this.product = product
          this.dialogRef.close({data: product})
        }
        else {
          this.product = product;
          this.alert.notifyWarn('No se ha editado la imagen', 2500, 'top', 'center')
        }
      },
      error => console.log(error),
      () => console.log('Edit completed')
    )
  }


  onFileUpload(event){
    const file = event.target.files[0];
    this.imagePath = file;
    



  }

  onClose(){
    this.dialogRef.close({data: this.product})
    console.log('onClose')
  }





}
