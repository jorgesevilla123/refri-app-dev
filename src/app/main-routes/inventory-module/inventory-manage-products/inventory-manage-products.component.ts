import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
import { InventoryService } from "../../../services/inventory.service";
import { Products } from "../../../products";






@Component({
  selector: 'app-inventory-manage-products',
  templateUrl: './inventory-manage-products.component.html',
  styleUrls: ['./inventory-manage-products.component.css']
})
export class InventoryManageProductsComponent implements OnInit {

  constructor(
     public dialog: MatDialog
     
  ) { }
products: Products[]

  

  ngOnInit(): void {

  }

 
   

  onSubmit(description, model, cost, quantity){
    const title = description;
    const modelo = model;
    const precio = cost;
    const cantidad = quantity;
    console.log(title, modelo, precio, cantidad);


  }

onFileUpload(event) {
  console.log(event)
}

