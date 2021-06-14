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
  isSearch: boolean = false

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
        this.warehouseId = params[0].id,
        this.warehouseName = params[0]['name?']; 
        this.page = params[1].page;   
        this.searchQuery = params[1].q
        this.loadPage(params[1].q, params[1].page)
      }
    )
  }




  loadPage(searchTerm, page){
    console.log(searchTerm)
    if(searchTerm === undefined){
      this.getProducts(this.page);
    }
    else {
      this.isSearch = true
      this.browseProduct(searchTerm, page)
    }
  }





  getProducts(page) {
    this.inventoryService.getPaginateProducts(page).subscribe(
      paginate => {
        this.pageOfItems = paginate.pageItems
        this.pager = paginate.paginator
        console.log(paginate)
      }
    )
  }



  browseProduct(searchTerm, page){
    this.inventoryService.searchProductAndPaginate(searchTerm, page).subscribe(
      paginate => {
        console.log(paginate);
        this.pageOfItems = paginate.pageOfItems
        this.pager = paginate.pager
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
