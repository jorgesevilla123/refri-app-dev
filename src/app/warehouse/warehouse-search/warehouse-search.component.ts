import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs'
import { Products } from 'src/app/interfaces-models/products';
import { WarehouseService } from '../../services/warehouse.service';

 @Component({
  selector: 'app-warehouse-search',
  templateUrl: './warehouse-search.component.html',
  styleUrls: ['./warehouse-search.component.css']
})
export class WarehouseSearchComponent implements OnInit {
  




  constructor(
    private warehouseService: WarehouseService
  ) { }


  pager: any = {}
  pageOfItems: Products[]

  ngOnInit(): void {
   
  }





  loadPage(searchTerm, page){
    if(searchTerm === undefined){
      return
    }
    else {
      this.warehouseService.searchWarehouseProducts(this.warehouseId, searchTerm, page).subscribe(
        paginationObject => {
          this.pager = paginationObject.pager
          this.pageOfItems = paginationObject.pagOfItems
        }
      )
    }


  }













}
