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

  constructor(
    public warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    const urlParameters = combineLatest([this.route.params, this.route.queryParams])
    urlParameters.subscribe(
      params => {
        this.getWarehouse(params[0].id, params[1].page);
        this.warehouseId = params[0].id,
        this.warehouseName = params[0].name
      }
    )
    }



  
  




  getWarehouse(warehouseId, page) {
    this.warehouseService.getOneWarehouse(warehouseId, page).subscribe(
      warehouse => {
        this.warehouse = warehouse.warehouse,
        this.products = warehouse.pageOfItems,
        this.pager = warehouse.pager


      }
    )
  }


  onAdd(){

  }

  searchProducts(key: string){

  }

}
