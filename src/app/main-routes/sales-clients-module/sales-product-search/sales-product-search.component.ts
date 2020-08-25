import { Component, OnInit, Inject, Optional} from '@angular/core';
import {Observable, Subject} from 'rxjs'
import { InventoryService } from "../../../services/inventory.service";
import { ClientsService } from "../../../services/clients.service";
import { Products } from "../../../products";
import { Client } from "../../../clients";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import {ActivatedRoute} from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";




@Component({
  selector: 'app-sales-product-search',
  templateUrl: './sales-product-search.component.html',
  styleUrls: ['./sales-product-search.component.css']
})
export class SalesProductSearchComponent implements OnInit {

  client: Client;

  quantity: number;
  private searchKeys = new Subject<string>()
  products$: Observable<Products[]>

  constructor(
    public inventoryService: InventoryService,
    public clientService: ClientsService,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<SalesProductSearchComponent> ,
    //Optional is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Client
  ) { 
   this.client = this.data
  
  }

  
  search(term: string){
    this.searchKeys.next(term);

  }


  ngOnInit(): void {


    this.products$ = this.searchKeys.pipe(

      //waiting 300 ms between every keystroke before considering the term
      debounceTime(1500),

      //ignore new term if it's the same as previous
      distinctUntilChanged(),

      //switch to new search observable every time the term changes

      switchMap((term: string) => this.inventoryService.searchProduct(term)),

    );


  }

  addToCart(product: Products){
    product.cantidad = this.quantity;
    this.clientService.addToCart(this.client, product).subscribe(
      client => this.client = client,
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
