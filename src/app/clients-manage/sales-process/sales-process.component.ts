import { Component, OnInit, OnDestroy, Input, Optional} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from "rxjs";
import { Client } from "../../interfaces-models/clients";
import { ClientsService } from "../../services/clients.service";
import { InventoryService } from "../../services/inventory.service";
import { Products } from "../../interfaces-models/products";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { shoppingBasket } from '../../interfaces-models/shopping-basket';
import {ChangeDetectorRef} from '@angular/core'
import { SalesProductSearchComponent } from "../sales-product-search/sales-product-search.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service"; 




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
  cart : boolean 




  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
     private inventoryService: InventoryService,
     private ref: ChangeDetectorRef,
     public dialog: MatDialog,
     public alert: AlertService
    
 
  ) 

  {
  
  }

  
  




  



  

  search(term: string): void {
    this.searchKeys.next(term);

  }

  ngOnDestroy(): void {
    
  }

  

  ngOnInit(): void {

   


    this.getClient();
 




   

    // this.products$ = this.searchKeys.pipe(

    //   //waiting 300 ms between every keystroke before considering the term
    //   debounceTime(1500),

    //   //ignore new term if it's the same as previous
    //   distinctUntilChanged(),

    //   //switch to new search observable every time the term changes

    //   switchMap((term: string) => this.inventoryService.searchProduct(term)),

    // );







  }


  getClient(){
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.getOneClient(id).subscribe(
      client => {
        if(client.cart.length < 1){
          this.client = client;
          this.cart = false;

        }
        else{
          this.client = client;
          this.cart = true;
        }
      }
      ,

      error => console.log(error),

      () => console.log('completed successfully')
    )
  }





  buyProduct(){
    this.client.cart.forEach(product => {
      this.clientService.buyProduct(this.client, product).subscribe(
        product => console.log(product)
      )
    })
    this.clearCart(this.client);
    this.alert.notifySuccess('Compra exitosa!', 3000, 'top', 'center')
    setTimeout( () => {
    location.reload()
      
    }, 3000)

  
  }



  removeFromCart(product){
    this.clientService.removeFromCart(this.client, product).subscribe(
      client => {
        if(client.cart.length < 1){
          this.client = client;
          this.cart = false;


        }
        else{
          this.client = client;
          this.cart = true;
        }

        if(product){
          this.alert.notifyWarn('Producto eliminado del carrito', 2500, 'top', 'center')

        }
        else {
          this.alert.notifyWarn('No se encontro producto para eliminar', 2500, 'top', 'center')
        }


      },
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
      result => {
        if(result.data.cart.length < 1){
          this.client = result.data;
          this.cart = false;
        }
        else{
          this.client = result.data
          this.cart = true;
        }
        
      
      },
      error => console.log(error),
      () => console.log('Completed')

    ) 
  }








}


