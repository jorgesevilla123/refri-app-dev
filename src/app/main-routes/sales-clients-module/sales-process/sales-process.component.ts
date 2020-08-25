import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from "rxjs";
import { Client } from "../../../clients";
import { ClientsService } from "../../../services/clients.service";
import { InventoryService } from "../../../services/inventory.service";
import { Products } from "../../../products";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { ShoppingBasketService } from '../../../services/shopping-basket.service';
import { shoppingBasket } from '../../../shopping-basket';
import {ChangeDetectorRef} from '@angular/core'
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";
import { SalesProductSearchComponent } from "../sales-product-search/sales-product-search.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";



@Component({
  selector: 'app-sales-process',
  templateUrl: './sales-process.component.html',
  styleUrls: ['./sales-process.component.css']
})
export class SalesProcessComponent implements OnInit, OnDestroy {
  client: Client
  searchKeyTitle: string
  products$ : Observable<Products[]>
  private searchKeys = new Subject<string>();
  productsBought: shoppingBasket[]




  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
     private inventoryService: InventoryService,
     private ref: ChangeDetectorRef,
     public dialog: MatDialog
 
  ) { }




  



  

  search(term: string): void {
    this.searchKeys.next(term);

  }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {


    this.getClient();

   

    this.products$ = this.searchKeys.pipe(

      //waiting 300 ms between every keystroke before considering the term
      debounceTime(1500),

      //ignore new term if it's the same as previous
      distinctUntilChanged(),

      //switch to new search observable every time the term changes

      switchMap((term: string) => this.inventoryService.searchProduct(term)),

    );









  }


  getClient(){
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.getOneClient(id).subscribe(
      client => this.client = client,
      error => console.log(error),
      () => console.log('completed successfully')

    )

  }

  
 

  buyProduct(){
    this.client.cart.forEach(product => {
      this.clientService.buyProduct(this.client, product);
    })
    this.clearCart(this.client);

  
  }




  removeFromCart(product){
    this.clientService.removeFromCart(this.client, product).subscribe(
      client => this.client = client,
      error => console.log(error),
      () => console.log('product removed from cart')

    )
    this.ref.detectChanges();
  }

  clearCart(client){
    this.clientService.clearCart(client).subscribe(
      client => this.client = client,
      error => console.log(error),
      () => console.log('cart cleared')
     )
  }



  searchDialog(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.data = this.client
    dialogConfig.width = '1500px'
    const dialogRef = this.dialog.open(SalesProductSearchComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => this.client = result.data,
      error => console.log(error),
      () => console.log('Completed')

    )
   
  

    
  }



}


