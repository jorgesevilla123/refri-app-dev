import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import { InventoryService } from "../../../services/inventory.service";
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";
import { InventoryManageProductsComponent } from "../../inventory-module/inventory-manage-products/inventory-manage-products.component";
import { InventoryProductEditComponent } from "../inventory-product-edit/inventory-product-edit.component";
import { InventoryImageEditComponent } from "../inventory-image-edit/inventory-image-edit.component";
import { Products } from "../../../interfaces-models/products";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/en-DE";
import { AlertService } from "../../../reusable-components/alerts/alert/alert.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";


registerLocaleData(localeDe, 'fr');



@Component({
  selector: 'app-inventory-search',
  templateUrl: './inventory-search.component.html',
  styleUrls: ['./inventory-search.component.css']
})
export class InventorySearchComponent implements OnInit {
  searchKeyTitle: string
  products: any
  productsArray: any
  searchKeys$ = new Subject<string>();
  product: Promise<Products>
  productsCount: number;

  constructor(
    private inventoryService: InventoryService,
    private dialogService: DialogService,
    private alert: AlertService,
    private dialog: MatDialog
  ) { }

  //Pushing a search term into the Observable stream




  ngOnInit(): void {
    this.countedProducts();

    this.inventoryService.searchProduct(this.searchKeys$).subscribe(
      products => { this.products = products }
    )
  }


  getProducts(): void {
    this.inventoryService.getProducts().subscribe(
      products => {
        if (products.length > 1) {
          this.products = products.splice(0, products.length);

        }
      })
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
            location.reload()
          }, 2000)
        }
        else {
          this.alert.notifyWarn('No se ha añadido el producto', 2500, 'top', 'center');
        }
      }

    )

  }


  onSearchClear() {
    this.searchKeyTitle = '';
  }

  onEdit(productForm: Products) {
    this.inventoryService.populateForm(productForm)
    console.log(productForm);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = productForm;
    const dialogRef = this.dialog.open(InventoryProductEditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      product => {
       
      

        if (productForm.title === product.data.title && productForm.modelo === product.data.modelo &&
          productForm.cantidad === product.data.cantidad && productForm.precio === product.data.precio) {

          this.alert.notifySuccess('No se han hecho cambios', 2500, 'top', 'center');

        }
        else {

          this.alert.notifySuccess('Producto editado', 2500, 'top', 'center');
          setTimeout( () => {
            location.reload()
          }, 2000)

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
        let theOne = ''
        let array = ''
        for (var i = 0; i < this.products.length; i++) {
          array += [
            this.products[i]
          ]
          if (this.products[i]._id == product.data._id) {
            this.products[i] = product.data
            array += [
              this.products[i]
            ]

          }


        }

        if (productChosen.imagePath === product.data.imagePath) {

          this.alert.notifySuccess('No se han hecho cambios', 2500, 'top', 'center');

        }
        else {

          this.alert.notifySuccess('Imagen editada', 2500, 'top', 'center');

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
          console.log(product)
          // let array = ''
          // for (var i = 0; i < this.products.length; i++) {

          //   if (this.products[i]._id == product._id) {
          //     this.products[i] = ''

          //     array += [
          //       this.products[i]
          //     ]

          //   }

          //   array += [
          //     this.products[i]
          //   ]
          // }


          let productCard = document.getElementById(`${product._id}`)
          productCard.remove()

          this.alert.notifyWarn(`Producto ${product.title} eliminado`, 2500, 'top', 'center');

        }
        else {
          this.alert.notifyWarn(`No se elimino ningun producto`, 2500, 'top', 'center');
        }
      }

    )
 


  }



  


}
