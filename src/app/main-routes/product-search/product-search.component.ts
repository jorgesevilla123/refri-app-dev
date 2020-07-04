import { Component, OnInit } from '@angular/core';
import { InventoryService } from "../../services/inventory.service";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Products } from "../../products";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { BusinessConfigurationsService } from '../../services/business-configurations.service'
import { Currency } from "../../currency";

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
searchKeyTitle: string
products$ : Observable<Products[]>
private searchKeys = new Subject<string>();
mediaSub: Subscription;
deviceXs: boolean
currency: Currency

  constructor(
    private inventoryService: InventoryService,
    public mediaObserver: MediaObserver,
    public businessConfig: BusinessConfigurationsService
  ) { }

   //Pushing a search term into the Observable stream to watch the changes over time

   search(term: string): void{
    this.searchKeys.next(term);

  }

  ngOnInit(): void {
    this.getCurrency();

    this.products$ = this.searchKeys.pipe(

      //waits 500ms before executing the search by the term
      debounceTime(1500),

      //ignores a term if it is the same as the previous
      distinctUntilChanged(),


      //switch to a new search observable everytime the term changes
      switchMap((term: string) => this.inventoryService.searchProduct(term))





    )

    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    })
  }

  onSearchClear() {
    this.searchKeyTitle = '';
  }


  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }


  getCurrency(){
    this.businessConfig.getCurrency().subscribe(
      currency => this.currency = currency

    )
  }

 







}
