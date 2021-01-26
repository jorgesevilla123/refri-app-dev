import { Component, OnInit, Inject, Optional} from '@angular/core';
import {Observable, Subject} from 'rxjs'
import { InventoryService } from "../../services/inventory.service";
import { ClientsService } from "../../services/clients.service";
import { Products } from "../../interfaces-models/products";
import { Client } from "../../interfaces-models/clients";
import {ActivatedRoute} from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";




@Component({
  selector: 'app-sales-product-search',
  templateUrl: './sales-product-search.component.html',
  styleUrls: ['./sales-product-search.component.css']
})
export class SalesProductSearchComponent implements OnInit {

  client: Client;
  products: any;
  quantity: number;
  public searchKeys$ = new Subject<string>()
  

  constructor(
    public inventoryService: InventoryService,
    public clientService: ClientsService,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<SalesProductSearchComponent>,
    public alert: AlertService,
    //Optional is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Client
  ) { 
   this.client = this.data
  
  }

  

  ngOnInit(): void {

    
    this.inventoryService.searchProduct(this.searchKeys$).subscribe(
      products => { this.products = products }
    )





  }

  addToCart(product: Products){
    product.cantidad = this.quantity;
    this.clientService.addToCart(this.client, product).subscribe(
      client => {
       if(product){
         this.client = client
         this.alert.notifySuccess('Producto añadido al carrito', 2500, 'top', 'center')
       }
       else{
       this.client = client
       this.alert.notifySuccess('No se añadio el producto', 2500, 'top', 'center')
       }
      },
      error => console.log(error),
      () => console.log('Product added to cart')
    )
    
  
  }


  getQuantity(quantity){
   this.quantity = quantity;

  }

  onAdded(): void {
    this.dialogRef.close({data: this.client})
  }

  onClose(): void {
    this.dialogRef.close({data: this.client});

  }








  


}
