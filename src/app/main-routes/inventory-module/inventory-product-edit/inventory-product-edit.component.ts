import { Component, OnInit, Injectable } from '@angular/core';
import { InventoryService } from "../../../services/inventory.service";
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";





@Component({
  selector: 'app-inventory-product-edit',
  templateUrl: './inventory-product-edit.component.html',
  styleUrls: ['./inventory-product-edit.component.css']
})
export class InventoryProductEditComponent implements OnInit {

  constructor(
    public inventoryService: InventoryService,
  ) { }



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
    this.inventoryService.editProduct(formData)
    
    

  }



  
    
  


  

}
