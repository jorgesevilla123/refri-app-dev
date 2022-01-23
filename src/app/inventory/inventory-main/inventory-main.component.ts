import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";
import { InventoryService } from "../../services/inventory.service"
import { CategoriesService } from '../../services/categories.service';
import { Products } from "../../interfaces-models/products";
import { AlertService } from "../../shared/alert-module/alert.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Categories } from '../../interfaces-models/categories';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryImageEditComponent } from "../inventory-image-edit/inventory-image-edit.component";
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';







@Component({
  selector: 'app-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.css']
})
export class InventoryMainComponent implements OnInit, AfterViewInit {





  favProducts: any = [
    { value: 'fav car', viewValue: 'Tesla X' },
    { value: 'fav phone', viewValue: 'Iphone Y' },
    { value: 'fav ship', viewValue: 'Starsteer' },
  ];

  @Input() value: string;

  toppings = new FormControl();
  toppingList: string[] = ['COMPRESORES', 'SELLOS', 'ACEITES', 'AUTOMOTRIZ'];

  searchKey: string;
  products: Products[];
  allProducts: number;
  response: any;
  firstPage: any = 1;
  categories: Categories[];
  pageOfItems: Products[] = [];
  pager: any = {};
  showProductsPager: boolean
  categoryQuery: string
  currentPage: number
  isSmallScreen: boolean
  count: number
  queryParams: string
  Categories: any = []








  constructor(
    public inventoryService: InventoryService,
    public alert: AlertService,
    public dialog: MatDialog,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver

  ) { }

  ngOnInit(): void {
    console.log('hey im the parent ')
    this.breakpointObserver.observe('(max-width: 600px)').subscribe(
      breakpoints => {
        this.isSmallScreen = breakpoints.matches,
          console.log(breakpoints.matches)
      }
    )
  }




  ngAfterViewInit(): void {

      
  }













  onChange(event: MatSelectChange) 

  {
    console.log(event.source.value);
    console.log(event.source.selected);
  }















  addCategory(category: string)
   {
    const isFound = this.Categories.find(value => value === category)

    if (isFound !== undefined) 
    {
      const index = this.Categories.indexOf(category);
      this.Categories.splice(index, 1);
      console.log(this.Categories)
    }
    else 
    {
      this.Categories.push(`${category}`)
      console.log(this.Categories)
    }
  }






  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.id = 'product-add-dialog'
    const dialogRef = this.dialog.open(InventoryManageProductsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      product => 
      {
        if (product) 
    
      {
          this.alert.notifySuccess

        }
        else 
        {
          this.alert.notifyWarn('No se ha añadido el producto', 2500, 'top', 'center');
        }
      }
    )
  }











  searchProducts(searchkey) {
  
    console.log('searching')
    let queryString = unescape(searchkey);
    let queryObject = {
      q: queryString,
      page: 1,
      category: this.Categories
    }
    this.router.navigate(['/inventario/busqueda'], { queryParams: queryObject });
  }





















  onEditPhoto(productChosen: Products) {

 


  }



  onDelete(product: Products) {
    this.inventoryService.deleteProduct(product).subscribe(
      product => {
        if (product) {
          console.log(product)



          this.alert.notifyWarn(`Eliminando ${product.title}`, 2500, 'top', 'center');

        }
        else {
          this.alert.notifyWarn(`No se elimino ningun producto`, 2500, 'top', 'center');
        }
      }

    )



  }












}


function Last(arg0: number): import("rxjs").OperatorFunction<import("@angular/router").Params, unknown> {
  throw new Error('Function not implemented.');
}

