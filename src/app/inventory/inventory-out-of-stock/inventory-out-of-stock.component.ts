import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service'
import { Products } from '../../interfaces-models/products'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-out-of-stock',
  templateUrl: './inventory-out-of-stock.component.html',
  styleUrls: ['./inventory-out-of-stock.component.css']
})

 




export class InventoryOutOfStockComponent implements OnInit {


  pages: number
  current: number
  i: number | number[]
  pager: any = {};
  pageOfItems = [];
  allItems
  

  constructor(
    private inventoryService: InventoryService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  
   }

  


  ngOnInit(): void {



    this.route.queryParams.subscribe(
       query => this.loadPage(query.page || 1)
      
       );
      }


      loadPage(page) {
    
        this.inventoryService.getPaginateProducts(page).subscribe(
     
          paginationObject => {
            
            this.pager = paginationObject.pager;
            this.pageOfItems = paginationObject.pageOfItems;
        } 
        )
      }



      searchProducts(searchValue){ 

        let queryString = unescape(searchValue);
      
        this.router.navigate(['/inventario/fuera-de-stock/search'], {queryParams:  { q :  queryString, page: 1 }})

      }


      




}
