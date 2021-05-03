import { Component, OnInit } from '@angular/core';
import { Products } from '../../interfaces-models/products'
import { InventoryService } from "../../services/inventory.service";
import { WarehouseService } from "../../services/warehouse.service";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";

@Component({
  selector: 'app-warehouse-products-add',
  templateUrl: './warehouse-products-add.component.html',
  styleUrls: ['./warehouse-products-add.component.css']
})
export class WarehouseProductsAddComponent implements OnInit {
  productsAdded: any[] = []
  products: any
  warehouseId: string
  warehouseName: string
  page: number
  pager: any = {}
  searchQuery: string
  pageOfItems: string

  constructor(
    public inventoryService: InventoryService,
    public router: Router,
    public route: ActivatedRoute,
    public warehouseService: WarehouseService,
    public alert: AlertService

  ) { }





 
  ngOnInit(): void {

    const urlParameters = combineLatest([this.route.params, this.route.queryParams])
    urlParameters.subscribe(
      params => {
        console.log(params);
        this.warehouseId = params[0].id,
        this.warehouseName = params[0]['name?']; 
        this.page = params[1].page;   
        this.searchQuery = params[1].q
        this.loadPage(params[1].q, params[1].page, params[0].id)
      }
    )
  }




  loadPage(searchTerm, page, warehouseId){
    if(searchTerm === undefined){
      this.getWarehouse(this.warehouseId, this.page);
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



  getWarehouse(warehouseId, page) {
    this.warehouseService.getOneWarehouse(warehouseId, page).subscribe(
      warehouse => {
        this.pageOfItems = warehouse.pageOfItems,
        this.pager = warehouse.pager
      }
    )
  }








 
  selectProduct(product){

      let index = this.productsAdded.map( function(x)   {
        return x.title 
      }).indexOf(product.title);
      
      if(index === -1) {
        product.cantidad = 1
        this.productsAdded.push(product);  
        console.log(index)
      } 


  }




  save(){

    this.warehouseService.AddProductToWarehouse(this.warehouseId, this.productsAdded).subscribe(
      res => {
        this.alert.notifySuccess(res.message, 2500, 'top', 'center')
      },
      err => {
        this.alert.notifyWarn(err, 2500, 'top', 'center')
      },
      () => { this.deleteAll()}
    )
  }








  deleteAll(){
    this.productsAdded.splice(0, this.productsAdded.length);
  }








  increase(product){
    let index = this.productsAdded.map( function(x)   {
      return x.title 
    }).indexOf(product.title);

    if(this.productsAdded[index].cantidad >= 1){
      this.productsAdded[index].cantidad += 1
    }
  }







  decrease(product){
    let index = this.productsAdded.map( function(x)   {
      return x.title 
    }).indexOf(product.title);

    if(this.productsAdded[index].cantidad === 1){
      this.productsAdded.splice(index, 1)
    }
    else if(this.productsAdded[index].cantidad >= 1){
      this.productsAdded[index].cantidad -= 1
    }
  }





  searchProduct(queryKey){
    let queryString = unescape(queryKey);
    this.router.navigate(['/almacenes/agregar-producto', this.warehouseId, this.warehouseName], {queryParams: {q: queryString, page: this.page || 1}})

  }




  

}
