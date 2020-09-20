import { Component, OnInit, Inject, Optional} from '@angular/core';
import { InventoryService } from "../../../services/inventory.service";
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Products } from "../../../products";
import { AlertService } from "../../../reusable-components/alerts/alert/alert.service";






@Component({
  selector: 'app-inventory-product-edit',
  templateUrl: './inventory-product-edit.component.html',
  styleUrls: ['./inventory-product-edit.component.css']
})
export class InventoryProductEditComponent implements OnInit {

  product: Products

  constructor(
    public inventoryService: InventoryService,
    public dialogRef: MatDialogRef<InventoryProductEditComponent>,
    public alert: AlertService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Products
  ) { 
    this.product = this.data
  }



  ngOnInit(): void {
  

    
    
  }

  editProduct(){
    let _id = this.inventoryService.productsForm.get('_id').value;
    let title = this.inventoryService.productsForm.get('title').value;
    let modelo = this.inventoryService.productsForm.get('modelo').value;
    let precio = this.inventoryService.productsForm.get('precio').value;
    let cantidad = this.inventoryService.productsForm.get('cantidad').value;
    const formData = new FormData();
    formData.append('_id', _id);
    formData.append('title', title);
    formData.append('modelo', modelo);
    formData.append('precio', precio);
    formData.append('cantidad', cantidad);
    this.inventoryService.editProduct(formData).subscribe(
      product =>{
        if(product){
        
          this.dialogRef.close({data: product})

        }
        else {
    
          this.alert.notifyWarn('No se ha editado el producto', 2500, 'top', 'center');
          this.dialogRef.close({data: product})
        }



      },
      error => console.log(error),
      () => console.log('Completed')
      
    )
    
    

  }

  onClose(){
    this.dialogRef.close({data: this.product})
    console.log('onClose')
  }




  
    
  


  

}
