import { Component, Input, OnInit } from '@angular/core';
import {combineLatest, Observable} from 'rxjs'
import { Products } from 'src/app/interfaces-models/products';
import { WarehouseService } from '../../services/warehouse.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

 @Component({
  selector: 'app-warehouse-search',
  templateUrl: './warehouse-search.component.html',
  styleUrls: ['./warehouse-search.component.css']
})
export class WarehouseSearchComponent implements OnInit {
  


  constructor(
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  pager: any = {}
  pageOfItems: any[]
  warehouseId: string
  warehouseName: string
  warehouse: any
  searchQuery: string




  ngOnInit(): void {
    const urlParameters = combineLatest([this.route.params, this.route.queryParams])
    urlParameters.subscribe(
      params => {
        this.loadPage(params[1].q, params[1].page)
        this.getWarehouse(params[0].id, params[1].page);
        this.warehouseId = params[0].id,
        this.warehouseName = params[0]['name?'];  
        this.searchQuery = params[1].q  
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
  loadPage(searchTerm, page){
    if(searchTerm === undefined){
      return
    }



    else {
      this.warehouseService.searchWarehouseProducts(this.warehouseId, searchTerm, page).subscribe(
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













}
