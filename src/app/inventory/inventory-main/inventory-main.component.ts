import { Component, OnInit } from '@angular/core';
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";
import { InventoryService } from "../../services/inventory.service"
import { CategoriesService } from '../../services/categories.service';
import { Products } from "../../interfaces-models/products";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Categories } from '../../interfaces-models/categories';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  icon?: string;
  routeLink: string | string[]
  queryParams?: Object
}


@Component({
  selector: 'app-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.css']
})
export class InventoryMainComponent implements OnInit {
  
  searchKey: string
  products: Products[]
  allProducts: number 
  response: any
  firstPage: any = 1
  categories : Categories[]


  tiles: Tile[] = [
    {cols: 1, rows: 4, color: 'rgba(255, 166, 0, 0.801)', icon: 'search', routeLink: '/inventario/busqueda'},
    {cols: 1, rows: 4, color: 'rgba(255, 166, 0, 0.801)', icon: 'report_problem', routeLink: '/inventario/bajo-stock'},
    {cols: 1, rows: 4, color: 'rgba(255, 166, 0, 0.801)', icon: 'remove_shopping_cart', routeLink: ['/inventario/fuera-de-stock'], queryParams: {page : 1}  },
    {cols: 1, rows: 4, color: 'rgba(255, 166, 0, 0.801)', icon: 'add_business', routeLink: '/inventario/por-pedir'},
  ];





  constructor(
    public inventoryService: InventoryService,
    public alert: AlertService,
     public dialog: MatDialog,
     private categoriesService: CategoriesService

    ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  
    
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    const dialogRef = this.dialog.open(InventoryManageProductsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      product => {
        if (product) {
          this.alert.notifySuccess(`Se añadio ${product.data.title} a los productos`, 2500, 'top', 'center')
          setTimeout( () => {
            location.reload()
          }, 2000)
        }
        else {
          this.alert.notifyWarn('No se ha añadido el producto', 2500, 'top', 'center');
        }
      }

    )




   

  }



  getCategories() {
    this.categoriesService.getCategories().subscribe(
      categories => {
        this.categories = categories
      }
    )




  }




  onSearchClear() {
    this.searchKey = '';
  }

  getProducts(): void {
    this.inventoryService.getProducts()
    .subscribe(products => {
      this.products = products.slice(0, products.length/(products.length/40)),
    this.allProducts = products.length});

  }

}
