import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { InventoryService } from "../../../services/inventory.service";
import { Products } from "../../../interfaces-models/products";
import {  MatDialogRef } from "@angular/material/dialog";







@Component({
  selector: 'app-inventory-manage-products',
  templateUrl: './inventory-manage-products.component.html',
  styleUrls: ['./inventory-manage-products.component.css']
})
export class InventoryManageProductsComponent implements OnInit {
  productsForm;
  products: Products[];



  constructor(
    public inventoryService: InventoryService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InventoryManageProductsComponent>


  ) {
    this.productsForm = this.formBuilder.group({
      title: '',
      modelo: '',
      precio: '',
      cantidad: '',
    })
  }
  imagePath;




  ngOnInit(): void {

  }


  addProduct() {
    const title = this.productsForm.get('title').value;
    const modelo = this.productsForm.get('modelo').value;
    const precio = this.productsForm.get('precio').value;
    const cantidad = this.productsForm.get('cantidad').value;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('modelo', modelo);
    formData.append('precio', precio);
    formData.append('cantidad', cantidad);
    formData.append('imagePath', this.imagePath);
      this.inventoryService.addProducts(formData).subscribe(
        product => {
          this.dialogRef.close({data: product});
        }
      )
  }


  onFileUpload(event) {
    try {
      const file = event.target.files[0];
      this.imagePath = file
    } catch (error) {
      console.log(`Unexpected error getting file at "onFileUpload": ${error} `);
    }
  }



  


  
}
