import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from "../../interfaces-models/products";
import { InventoryService } from "../../services/inventory.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";
import { DialogService } from "../../reusable-components/dialogs/dialog/dialog.service";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";
import { InventoryProductEditComponent } from '../inventory-product-edit/inventory-product-edit.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";





@Component({
  selector: 'app-inventory',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['title', 'modelo', 'precio', 'cantidad', 'buttons']  //you can change the order of columns here
 

  products: Products[]   //Defining the data type of the products

  @ViewChild(MatSort) sort: MatSort; //Querying the element in the DOM that matches the property and watching for changes
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  searchKey: string
  


  constructor(
    private inventoryService: InventoryService,
    private  dialogService: DialogService,
    private alertService: AlertService,
    public dialog : MatDialog,
    public alert: AlertService
  

    ) { } //Injecting the service with DI
  listData : MatTableDataSource<any>


  ngOnInit() {

    this.getProducts();
    

  }



  getProducts() {

    this.inventoryService.getProducts().subscribe(  //Getting the products to render in the data table
      list => {
        let array = list.map(item => {
          return {
            ...item
          }
        })
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.products = list

      }
    ) 
  }

  



  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();

  }


  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();

  }

  //Dialog for adding new products
  onAdd() {
    this.dialogService.open(InventoryManageProductsComponent, true, true, "40%", "auto");

  }


  deleteProduct(product: Products): void {
    alert("Estas seguro que quieres eliminar este producto?");
    this.inventoryService.deleteProduct(product).subscribe(
      product => {
        if(product){
          this.alertService.notifyWarn(`Producto ${product.title} has sido eliminado`, 2500, 'top', 'center' );
          return this.getProducts();
        }
        else{
          this.alertService.notifyWarn(`No se ha eliminado el producto`, 2500, 'top', 'center' );
          
        }
      },

      error => console.log(error),

      () => console.log('Product deleted')
    
    )
  ;
    
    // this.products = this.products.filter(p => p !== product);
    // this.inventoryService.deleteProduct(product).subscribe();

  }

  onEdit(row){
    this.inventoryService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = row
    console.log(row);
    const dialogRef = this.dialog.open(InventoryProductEditComponent, dialogConfig);
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

        if (row.title === product.data.title && row.modelo === product.data.modelo &&
          row.cantidad === product.data.cantidad && row.precio === product.data.precio) {

          this.alert.notifySuccess('No se han hecho cambios', 2500, 'top', 'center');


        }
        else {

          this.alert.notifySuccess('Producto editado', 2500, 'top', 'center');
          return this.getProducts();

        }

      },


      error => console.log(error),

      () => console.log('completed')


    )


  }

  


 

}
