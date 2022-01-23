import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { InventoryService } from '../../services/inventory.service'
import { Products } from '../../interfaces-models/products'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { InventoryProductEditComponent } from "../inventory-product-edit/inventory-product-edit.component";
import { AlertService } from "../../shared/alert-module/alert.service";
import { Router } from '@angular/router';
import { InventoryManageProductsComponent } from '../inventory-manage-products/inventory-manage-products.component';
import { InventoryImageEditComponent } from '../inventory-image-edit/inventory-image-edit.component';
import { ConfirmationComponent } from "../../shared/confirmation/confirmation/confirmation.component";



@Component({
  selector: 'app-inventory-overview',
  templateUrl: './inventory-overview.component.html',
  styleUrls: ['./inventory-overview.component.css'],

})
export class InventoryOverviewComponent implements OnInit, OnDestroy {
  isSmallScreen: boolean;
  pager: any = {};
  products: Products[];
  count: number;
  showProductsPager: boolean
  categoryQuery: string
  currentPage: number

  constructor(
    private breakPointObserver: BreakpointObserver,
    private inventoryService: InventoryService,
    private alert: AlertService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('sup im the child');
  
    this.loadProducts(1);

    
    this.breakPointObserver.observe('(max-width: 600px)').subscribe(
      breakPoints => {
        this.isSmallScreen = breakPoints.matches
      })






  }










  trackById(index: number, product: any): number {
    console.log('trackby executed');
    return product._id, product.title, product.modelo, product.cantidad, product.precio, product.categorias

  }


  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.id = 'product-add-dialog'
    const dialogRef = this.dialog.open(InventoryManageProductsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      product => {
        if (product) {



          this.products.push(product.data);
          this.count = this.products.length;
          this.alert.notifySuccess;



        }
        else {
          this.alert.notifyWarn('No se ha añadido el producto', 2500, 'top', 'center');
        }
      },
      err => {
        console.log(err)
      },



      () => {

        console.log('completed');
  

      }
    )
  }



  loadProducts(page): void {

    this.inventoryService.getPaginateProducts(page).subscribe(
      paginationObject => {
        console.log(paginationObject)
        this.pager = paginationObject.paginator,
          this.products = paginationObject.pageItems
        this.count = paginationObject.count
      }
    )

  }






  onEdit(productForm: Products) {
    console.log(productForm);
    this.inventoryService.populateForm(productForm)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = productForm;
    const dialogRef = this.dialog.open(InventoryProductEditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      product => {
    
        const index = this.products.findIndex(productFound => productFound._id === product.data._id)
        console.log(product.data)
        
        let { title, modelo, cantidad, precio, categorias} = product.data


        this.products[index].title = title
        this.products[index].modelo = modelo
        this.products[index].cantidad = cantidad
        this.products[index].categorias = categorias
        this.products[index].precio = precio

        this.alert.notifySuccess('Producto editado', 2000, 'top', 'center');
       

        

        
        

    

      },
      error => console.log(error),
      () => console.log('completed')


    )



  }


  onDelete(product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%'
    dialogConfig.data = product
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig)
    // let confirmation = new ConfirmationComponent(dialogRef)
    // confirmation.message('Eliminar producto', 'delete', this.inventoryService.deleteProduct(product))

    dialogRef.afterClosed().subscribe(
      val => {
        console.log(val.data.deleted);
        if(val.data.deleted){

          const index = this.products.findIndex(productFound => productFound._id === product._id)
          this.products.splice(index,1);
          this.count = this.products.length;
          

          this.alert.notifyWarn(`Eliminando ${product.title}`, 2500, 'top', 'center');
          return 

        }
        else {
          this.alert.notifyWarn(`No se ha eliminado el producto`, 2500, 'top', 'center');
          return

        }
      }
    )




    // this.inventoryService.deleteProduct(product).subscribe(
    //   product => {
    //     if (product) {
    //       const index = this.products.findIndex(productFound => productFound._id === product._id)
    //       this.products.splice(index,1);
    //       this.count = this.products.length;
          

    //       this.alert.notifyWarn(`Eliminando ${product.title}`, 2500, 'top', 'center');

    //     }
    //     else {
    //       this.alert.notifyWarn(`No se elimino ningun producto`, 2500, 'top', 'center');
    //     }
    //   }
    // )
  }




  onEditPhoto(product) { 
    this.inventoryService.populatePhotoForm(product);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = product
    const dialogRef = this.dialog.open(InventoryImageEditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      product => {

        if (product.data === undefined) {

          this.alert.notifySuccess('No se han hecho cambios', 2500, 'top', 'center');
          return
        }
        else
         {
          const index = this.products.findIndex(productFound => productFound._id === product.data._id)
          console.log(product.data.imagePath);
          this.products[index].imagePath = product.data.imagePath

          this.alert.notifySuccess('Imagen editada', 2500, 'top', 'center');
       

        }

      },


      error => console.log(error),

      () => console.log('completed')


    )
  

  }





  ngOnDestroy(): void {
    console.log('component destroyed');

  }















}


