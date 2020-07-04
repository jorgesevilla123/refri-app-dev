import { Component, OnInit, ViewChild } from '@angular/core';

import { Products } from "../../../products";
import { InventoryService } from "../../../services/inventory.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { InventoryManageProductsComponent } from "../inventory-manage-products/inventory-manage-products.component";
import { DialogService } from "../../../reusable-components/dialogs/dialog/dialog.service";
import { AlertService } from "../../../reusable-components/alerts/alert/alert.service";
import { ConfirmationComponent } from "../../../reusable-components/confirmation/confirmation.component";
import { InventoryProductEditComponent } from '../inventory-product-edit/inventory-product-edit.component';






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
    this.inventoryService.deleteProduct(product); 
    this.alertService.notify("Producto eliminado");
    setTimeout( () => {
      location.reload();
    }, 1000);
  

    // this.products = this.products.filter(p => p !== product);
    // this.inventoryService.deleteProduct(product).subscribe();

  }

  onEdit(row){
    this.inventoryService.populateForm(row);
    this.dialogService.open(InventoryProductEditComponent, true, true, "40%", "auto");

  }

  


 

}
