import { Component, OnInit } from '@angular/core';
import { WarehouseService } from "../../services/warehouse.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Warehouse } from "../../interfaces-models/warehouses"
import { Products } from "../../interfaces-models/products"
import { HttpParams } from '@angular/common/http';




@Component({
  selector: 'app-warehouse-manage',
  templateUrl: './warehouse-manage.component.html',
  styleUrls: ['./warehouse-manage.component.css']
})
export class WarehouseManageComponent implements OnInit {

  warehouse: Warehouse
  products: Products[]
  pager: any = {}
  page: number 
  warehouseId: string
  warehouseName: string
  pageOfItems: Products[] = []
  isSearchParam: boolean

  constructor(
    public warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    const urlParameters = combineLatest([this.route.params, this.route.queryParams])
    urlParameters.subscribe(
      params => {
        console.log(params);
        this.getWarehouse(params[0].id, params[1].page);
        this.warehouseId = params[0].id,
        this.warehouseName = params[0]['name?'];
        if(params[1].q){
          this.loadPage(this.route.queryParams, params[1].page);
        }
       
        
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


  onAdd(){

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
          this.pageOfItems = paginationObject.pagOfItems
          this.isSearchParam = true
        }
      )
    }


  }





// Navigates to inventory route for searching
  searchProducts(queryKey){

    let queryString = unescape(queryKey);
    console.log(this.warehouseId);
    console.log(this.warehouseName);
    console.log(queryString);

    this.router.navigate(['/almacenes/administrar-almacen', this.warehouseId, this.warehouseName], {queryParams: {q: queryString, page: 1}})


  }






  

}
