import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { InventoryService } from "../../../services/inventory.service";
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";
import { InventoryManageProductsComponent } from "../../inventory-module/inventory-manage-products/inventory-manage-products.component";
import { InventoryProductEditComponent } from "../inventory-product-edit/inventory-product-edit.component";
import { InventoryImageEditComponent } from "../inventory-image-edit/inventory-image-edit.component";
import { Products } from "../../../products";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/en-DE";
import { AlertService } from "../../../reusable-components/alerts/alert/alert.service";

registerLocaleData(localeDe, 'fr');



@Component({
  selector: 'app-inventory-search',
  templateUrl: './inventory-search.component.html',
  styleUrls: ['./inventory-search.component.css']
})
export class InventorySearchComponent implements OnInit {
  searchKeyTitle: string
  products$ : Observable<Products[]>
  private searchKeys = new Subject<string>();
  product: Promise<Products>
  products: number

  constructor(
    private inventoryService: InventoryService,
    private dialogService: DialogService,
    private alert: AlertService
  ) { }

  //Pushing a search term into the Observable stream



  search(term: string): void {
    this.searchKeys.next(term);

  }

  ngOnInit(): void {
    this.getProducts();
    this.products$ = this.searchKeys.pipe(

      //waiting 300 ms between every keystroke before considering the term
      debounceTime(1500),

      //ignore new term if it's the same as previous
      distinctUntilChanged(),

      //switch to new search observable every time the term changes

      switchMap((term: string) => this.inventoryService.searchProduct(term)),

    );

  }


  getProducts(): void {
    this.inventoryService.getProducts()
    .subscribe(products => this.products = products.length);

  }

  onAdd() {
    this.dialogService.open(InventoryManageProductsComponent, true, true, "40%", "auto");

  }

  
  onSearchClear() {
    this.searchKeyTitle = '';
  }

  onEdit(product: Products){
    this.inventoryService.populateForm(product);
    this.dialogService.open(InventoryProductEditComponent, true, true, "40%", "auto");


  }
  
  onEditPhoto(product: Products){
    this.inventoryService.populatePhotoForm(product);
    this.dialogService.open(InventoryImageEditComponent, true, true, "40%", "auto");
  }

  

  onDelete(product: Products): void {
    alert("estas seguro que quieres eliminar este producto");
    this.inventoryService.deleteProduct(product);
    this.alert.notify(`${product.title} eliminado`);
    setTimeout( () => {
      location.reload();
    }, 1400);
    

  }

 



}
