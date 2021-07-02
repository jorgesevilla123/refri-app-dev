import { Component, Input, OnInit } from '@angular/core';
import {combineLatest, Observable} from 'rxjs'
import { Products } from 'src/app/interfaces-models/products';
import { WarehouseService } from '../../services/warehouse.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ProductDeleteDialogComponent } from "../../reusable-components/product-delete-dialog/product-delete-dialog.component";

 @Component({
  selector: 'app-warehouse-search',
  templateUrl: './warehouse-search.component.html',
  styleUrls: ['./warehouse-search.component.css']
})
export class WarehouseSearchComponent implements OnInit {
  


  constructor(
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog

  ) { }


  pager: any = {}
  pageOfItems: any[]
  warehouseId: string
  warehouseName: string
  warehouse: any
  searchQuery: string
  page: number 




  ngOnInit(): void {
    const urlParameters = combineLatest([this.route.params, this.route.queryParams])
    urlParameters.subscribe(
      params => {
        this.warehouseId = params[0].id,
        this.warehouseName = params[0]['name?'];  
        this.searchQuery = params[1].q  
        this.page = params[1].page;
        this.loadPage(params[1].q, params[1].page, params[0].id)
        this.getWarehouse(params[0].id, params[1].page);
     
      }
    )
  }


  
  onAdd(){

  }



  getWarehouse(warehouseId, page) {
    this.warehouseService.getOneWarehouse(warehouseId, page).subscribe(
      warehouse => {
        this.warehouse = warehouse.warehouse
      }
    )
  }








  //gets the search and page term from the route query param and executes and returns the pagination object
  loadPage(searchTerm, page, warehouseId){
    if(searchTerm === undefined){
      return
    }



    else {
      this.warehouseService.searchWarehouseProducts(warehouseId, searchTerm, page).subscribe(
        paginationObject => {
          this.pager = paginationObject.pager
          this.pageOfItems = paginationObject.pageOfItems
          console.log(paginationObject.pageOfItems);
        }
      )
    }
  }



  searchProducts(queryKey){

    let queryString = unescape(queryKey);
    console.log(this.warehouseId);
    console.log(this.warehouseName);
    console.log(queryString);

    this.router.navigate(['/almacenes/administrar-almacen/busqueda', this.warehouseId, this.warehouseName], {queryParams: {q: queryString, page: 1}})


  }



  onDelete(product){
    let warehouseId = this.warehouseId
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
    ),
    () => {
      this.loadPage(this.searchQuery, this.page, this.warehouseId)
      console.log('Passed complete and deleted')
    }

  }


  onEdit(product){

  }

  onEditPhoto(product){

  }













}
