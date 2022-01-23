import { Component, OnInit, OnDestroy, OnChanges, DoCheck, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit, SimpleChanges } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import { InventoryService } from "../../services/inventory.service";
import { DialogService } from "../../reusable-components/dialogs/dialog/dialog.service";
import { InventoryProductEditComponent } from "../inventory-product-edit/inventory-product-edit.component";
import { InventoryImageEditComponent } from "../inventory-image-edit/inventory-image-edit.component";
import { Products } from "../../interfaces-models/products";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/en-DE";
import { AlertService } from "../../shared/alert-module/alert.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as querystring from 'querystring'


registerLocaleData(localeDe, 'fr');



@Component({
  selector: 'app-inventory-search',
  templateUrl: './inventory-search.component.html',
  styleUrls: ['./inventory-search.component.css']
})
export class InventorySearchComponent implements OnInit, OnDestroy {




  productsCount: number;
  pager: any = {};
  pageOfItems: Products[] = [];
  searchQuery: any
  page: number;
  isSmallScreen: boolean
  appquery

  constructor(
    private inventoryService: InventoryService,
    private dialogService: DialogService,
    private alert: AlertService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private breakPointObserver: BreakpointObserver
  ) {
    
   }

  //Pushing a search term into the Observable stream




  ngOnInit(): void {
    console.log('component initialized');
  

    console.log('im the search child')
    //Breakpoint observer returning true if the viewport is less than 600px
    if(this.breakPointObserver.isMatched('(max-width: 600px)')) {
      console.log('the screen size is less than 600px')
    }


      // Observer that checks the breakpoints and returns true when the screen is small
    this.breakPointObserver.observe('(max-width: 600px)').subscribe(
      breakpoints => {
        this.isSmallScreen = breakpoints.matches,
        console.log(breakpoints.matches)
      }
    )



      //gets query params and load the page with the search and page
     this.route.queryParams.subscribe(
      query => {
        this.appquery = querystring.stringify(query)
        console.log(query);
        console.log(this.appquery)
        console.log(query.q);
        console.log(query.categories)
        this.loadPage(query);
        this.searchQuery = query
        this.page = query.page;
      }
    )
  }


  ngOnDestroy(): void {
      console.log('component destroyed');
  }




















  //gets the search and page term from the route query param and executes and returns the pagination object


  loadPage(query) {
    console.log(query)
      this.inventoryService.searchProductAndPaginate(query).subscribe(
        paginationObject => {
          this.pager = paginationObject.pager
          this.pageOfItems = paginationObject.pageOfItems        
        }
  
      )
    }
  









  onEdit(productForm: Products) {
    this.inventoryService.populateForm(productForm)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = productForm;
    const dialogRef = this.dialog.open(InventoryProductEditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      product => {
          console.log(product.formData)
          this.inventoryService.editProduct(product.formData).subscribe(
            () => {
              this.alert.notifySuccess('Producto editado', 2500, 'top', 'center');
            }
          )
  

      },

      error => console.log(error),

      () => this.loadPage(this.searchQuery)
    )
  }








  

  onEditPhoto(productChosen: Products) {
    
    this.inventoryService.populatePhotoForm(productChosen);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = productChosen
    const dialogRef = this.dialog.open(InventoryImageEditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      product => {

        if (productChosen.imagePath === product.data.imagePath) {

          this.alert.notifySuccess('No se han hecho cambios', 2500, 'top', 'center');

        }
        else {

          this.alert.notifySuccess('Imagen editada', 2500, 'top', 'center');
          this.router.navigate(['/inventario/busqueda'], {queryParams:  { q :  this.searchQuery, page: 1 }});

        }

      },


      error => console.log(error),

      () => console.log('completed')


    )



    
  }



  onDelete(product: Products) {
    this.inventoryService.deleteProduct(product).subscribe(
      product => {
        if (product) {
         


          this.alert.notifyWarn(`Eliminando ${product.title}`, 2500, 'top', 'center');

        }
        else {
          this.alert.notifyWarn(`No se elimino ningun producto`, 2500, 'top', 'center');
        }
      }

    )
 


  }



  


}
