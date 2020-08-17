import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from "rxjs";
import { Client } from "../../../clients";
import { ClientsService } from "../../../services/clients.service";
import { InventoryService } from "../../../services/inventory.service";
import { Products } from "../../../products";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { ShoppingBasketService } from '../../../services/shopping-basket.service';
import { shoppingBasket } from '../../../shopping-basket';
import { getLocaleDateFormat } from '@angular/common';


@Component({
  selector: 'app-sales-process',
  templateUrl: './sales-process.component.html',
  styleUrls: ['./sales-process.component.css']
})
export class SalesProcessComponent implements OnInit, OnDestroy {
  client$: Observable<Client>
  searchKeyTitle: string
  products$ : Observable<Products[]>
  private searchKeys = new Subject<string>();
  productsBought: shoppingBasket[]




  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router,
     private inventoryService: InventoryService,
     private shoppingBasketService: ShoppingBasketService
 
  ) { }


  

  search(term: string): void {
    this.searchKeys.next(term);

  }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {

    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
      this.clientService.getOneClient(params.get('id')))

    )

    this.products$ = this.searchKeys.pipe(

      //waiting 300 ms between every keystroke before considering the term
      debounceTime(1500),

      //ignore new term if it's the same as previous
      distinctUntilChanged(),

      //switch to new search observable every time the term changes

      switchMap((term: string) => this.inventoryService.searchProduct(term)),

    );



    this.showShoppingBasket();





  }

  
 

  buyProduct(client: Client, products: shoppingBasket[]){
    this.clientService.buyProduct(client, products);
    console.log(products)
    this.shoppingBasketService.emptyBasket().subscribe(
      result => console.log('successfully empty'),
      error => console.log('Error in empty')
    )


  }

  addToCart(client: Client, products: shoppingBasket[]){
    this.clientService
  }

  removeProduct(product: shoppingBasket){
    this.shoppingBasketService.deleteProduct(product);
    this.showShoppingBasket();

  }

}
