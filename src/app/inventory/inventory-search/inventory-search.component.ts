import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import { InventoryService } from "../../services/inventory.service";
import { DialogService } from "../../reusable-components/dialogs/dialog/dialog.service";
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";
import { InventoryProductEditComponent } from "../inventory-product-edit/inventory-product-edit.component";
import { InventoryImageEditComponent } from "../inventory-image-edit/inventory-image-edit.component";
import { Products } from "../../interfaces-models/products";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/en-DE";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router, ActivatedRoute } from '@angular/router';


registerLocaleData(localeDe, 'fr');



@Component({
  selector: 'app-inventory-search',
  templateUrl: './inventory-search.component.html',
  styleUrls: ['./inventory-search.component.css']
})
export class InventorySearchComponent implements OnInit {




  productsCount: number;
  pager: any = {};
  pageOfItems: Products[] = [];
  searchQuery: string ;
  page: number;

  constructor(
    private inventoryService: InventoryService,
    private dialogService: DialogService,
    private alert: AlertService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  //Pushing a search term into the Observable stream




  ngOnInit(): void {

     this.route.queryParams.subscribe(
      query => {
        this.loadPage(query.q, query.page || 1);
        console.log(query.q);
        this.searchQuery = query.q;
        this.page = query.page;
      }
    )


    
        

    this.countedProducts();




  }



  loadPage(searchTerm, page) {
    if(searchTerm === undefined) {
      return

    } else {
      this.inventoryService.searchProductAndPaginate(searchTerm, page).subscribe(
        paginationObject => {
  
          this.pager = paginationObject.pager
          this.pageOfItems = paginationObject.pageOfItems
        
       
        }
  
      )

    }
   



  }




  searchProducts(searchkey){

     let queryString = unescape(searchkey);

     this.router.navigate(['/inventario/busqueda'], {queryParams:  { q :  queryString, page: 1 }});
      
  
  }



  countedProducts(){
    this.inventoryService.countProducts().subscribe(
      count => this.productsCount = count,
      error => console.log(error),
      () => console.log('completed')


    )
  }



  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    const dialogRef = this.dialog.open(InventoryManageProductsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      product => {
        if (product) {
          this.alert.notifySuccess(`Se añadio ${product.data.title} a los productos`, 2500, 'top', 'center')
          setTimeout( () => {
            this.router.navigate(['/inventario/busqueda'], {queryParams:  { q :  this.searchQuery, page: 1 }});
          }, 2000)
        }
        else {
          this.alert.notifyWarn('No se ha añadido el producto', 2500, 'top', 'center');
        }
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

        
       
      

        if (productForm.title === product.data.title && productForm.modelo === product.data.modelo &&
          productForm.cantidad === product.data.cantidad && productForm.precio === product.data.precio 
          && product.data.categoria === productForm.categorias) {

          this.alert.notifySuccess('No se han hecho cambios', 2500, 'top', 'center');

          return 


        }
        else {
          this.inventoryService.editProduct(product.formData).subscribe(
            () => {
              this.alert.notifySuccess('Producto editado', 2500, 'top', 'center');
              setTimeout( () => {
                window.location.reload()
                this.router.navigate(['/inventario/busqueda'], {queryParams:  { q :  this.searchQuery, page:  this.page}});
              }, 2000)
            }
          )
        }

      },


      error => console.log(error),

      () => console.log('completed')


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
