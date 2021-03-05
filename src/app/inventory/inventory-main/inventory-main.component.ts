import { Component, OnInit } from '@angular/core';
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";
import { InventoryService } from "../../services/inventory.service"
import { CategoriesService } from '../../services/categories.service';
import { Products } from "../../interfaces-models/products";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Categories } from '../../interfaces-models/categories';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryProductEditComponent } from "../inventory-product-edit/inventory-product-edit.component";
import { InventoryImageEditComponent } from "../inventory-image-edit/inventory-image-edit.component";
import { BreakpointObserver } from '@angular/cdk/layout';




@Component({
  selector: 'app-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.css']
})
export class InventoryMainComponent implements OnInit {
  
  searchKey: string;
  products: Products[];
  allProducts: number; 
  response: any;
  firstPage: any = 1;
  categories : Categories[];
  pageOfItems: Products[] = [];
  pager: any = {};
  showProductsPager: boolean 
  categoryQuery: string
  currentPage: number
  isSmallScreen: boolean





  constructor(
    public inventoryService: InventoryService,
    public alert: AlertService,
     public dialog: MatDialog,
     private categoriesService: CategoriesService,
     private router : Router,
     private route: ActivatedRoute,
     private breakpointObserver: BreakpointObserver


    ) { }

  ngOnInit(): void {

    this.breakpointObserver.observe('(max-width: 600px)').subscribe(
      breakpoints => {
        this.isSmallScreen = breakpoints.matches,
        console.log(breakpoints.matches)
      }
    )
    






    this.route.queryParams.subscribe(
      params => {


        if(params.category === undefined) {
          this.showProductsPager = true
          this.router.navigate(['/inventario'], {queryParams:  { page: params.page || 1 }});
          this.loadProducts(params.page || 1);
        } 

        else {
          this.showProductsPager = false
          this.getProductsByCategories(params.category, params.page || 1);
        }
      }
    )
    this.getCategories();
  
    
  }






  getProductsByCategories(category, page){
    this.inventoryService.getProductsByCategory(category, page).subscribe(
      paginationObject => {
        this.pager = paginationObject.pager,
        this.products = paginationObject.pageOfItems,
        this.categoryQuery = category,
        this.currentPage = page
      }

    )

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





    searchProducts(searchkey){

     let queryString = unescape(searchkey);

     this.router.navigate(['/inventario/busqueda'], {queryParams:  { q :  queryString, page: 1 }});
      
  
  }







  getCategories() {
    this.categoriesService.getCategories().subscribe(
      categories => {
        this.categories = categories
      }
    )
  }





  loadProducts(page): void {
  
    this.inventoryService.getPaginateProducts(page).subscribe(
      paginationObject => {
        console.log(paginationObject)
        this.pager = paginationObject.paginator,
        this.products = paginationObject.pageItems
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
                this.router.navigate(['/inventario/busqueda'], {queryParams:  { q :  this.categoryQuery, page:  this.currentPage}});
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
          this.router.navigate(['/inventario/busqueda'], {queryParams:  { q :  this.categoryQuery, page: 1 }});

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


