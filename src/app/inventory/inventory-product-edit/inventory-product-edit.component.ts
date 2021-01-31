import { Component, OnInit, Inject, Optional} from '@angular/core';
import { InventoryService } from "../../services/inventory.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Products } from "../../interfaces-models/products";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";






@Component({
  selector: 'app-inventory-product-edit',
  templateUrl: './inventory-product-edit.component.html',
  styleUrls: ['./inventory-product-edit.component.css']
})
export class InventoryProductEditComponent implements OnInit {

  product: any

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
    let categoria = this.inventoryService.productsForm.get('categoria').value;
    const formData = new FormData();
    formData.append('_id', _id);
    formData.append('title', title);
    formData.append('modelo', modelo);
    formData.append('precio', precio);
    formData.append('categoria', categoria);
    formData.append('cantidad', cantidad);  
    let products = {
      title : title,
      modelo: modelo,
      precio: precio,
      cantidad: cantidad,
      categorias: categoria
    }
  
          this.dialogRef.close({data: products, formData: formData});
          this.product = products

        


  }



  onClose(){
    console.log(this.product);
    this.dialogRef.close({data: this.product})
    console.log('onClose')
  }




  
    
  


  

}
