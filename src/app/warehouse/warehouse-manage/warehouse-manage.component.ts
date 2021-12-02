 import { Component, OnInit } from '@angular/core';
import { WarehouseService } from "../../services/warehouse.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Warehouse } from "../../interfaces-models/warehouses"
import { Products } from "../../interfaces-models/products"
import { HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";
import {  ProductDeleteDialogComponent } from "../../reusable-components/product-delete-dialog/product-delete-dialog.component"
import { DeleteWarehouseDialogComponent } from '../delete-warehouse-dialog/delete-warehouse-dialog.component';



@Component({
  selector: 'app-warehouse-manage',
  templateUrl: './warehouse-manage.component.html',
  styleUrls: ['./warehouse-manage.component.css']
})
export class WarehouseManageComponent implements OnInit {

  warehouse: Warehouse
  products: any
  pager: any = {} 
  page: any
  warehouseId: string
  warehouseName: string
  pageOfItems: Products[] = []
  isSearchParam: boolean
  query: any

  constructor(
    public warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private alert: AlertService

  ) { }

  ngOnInit(): void {
    const urlParameters = combineLatest([this.route.params, this.route.queryParams])
    urlParameters.subscribe(
      params => {
        console.log(params);
        this.page = params[1].page;
        console.log(this.page);
        this.getWarehouse(params[0].id, params[1].page);
        this.warehouseId = params[0].id,
          this.warehouseName = params[0]['name?'];
      }
    )
  }






  getWarehouse(warehouseId, page) {
    this.warehouseService.getOneWarehouse(warehouseId, page).subscribe(
      warehouse => {
        this.warehouse = warehouse.warehouse,
          this.products = warehouse.pageOfItems,
          this.pager = warehouse.pager
        this.isSearchParam = false


      }
    )
  }


  onAdd() {

  }








  // Navigates to inventory route for searching
  searchProducts(queryKey) {
    let queryString = unescape(queryKey);
    console.log(this.warehouseId);
    console.log(this.warehouseName);
    console.log(queryString);
    this.query = queryString;
    this.router.navigate(['/almacenes/administrar-almacen/busqueda', this.warehouseId, this.warehouseName], { queryParams: { q: queryString, page: 1 } })
  }



  onEdit(product) {

  }3


  onDeleteProduct(product){
    let warehouseId = this.warehouseId
    let page = this.page;
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.width = '40%'
    dialogConfig.data = {product, warehouseId}
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      warehouse => {
        console.log(warehouse.data);
      },
      err => {

        console.log(err)

      },
      () => {
        this.getWarehouse(this.warehouseId, this.page);

  
 
  
      }
 
    )
  }


  onDeleteWarehouse(){
    let warehouseId = this.warehouseId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = this.warehouse;
    const dialogRef = this.dialog.open(DeleteWarehouseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      warehouse => {
        console.log(warehouse.data)
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('warehouse deleted')
      }
    )


  }








  onEditPhoto(product) {

  }








}
