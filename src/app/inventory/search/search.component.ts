import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Products } from '../../interfaces-models/products';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQ: string 

  constructor(
    private inventoryService: InventoryService,
    public route: ActivatedRoute,
    public router: Router
  ) { }


  pager: any = {};
  pageOfItems: Products[] = [];
  searchQuery: string 

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      query => {
        console.log(query.q);
        this.loadPage(query.q, query.page || 1);
        this.searchQuery = query.q

        

        
      }

    )

  }



  loadPage(searchTerm, page) {
    this.inventoryService.searchProductAndPaginate(searchTerm, page).subscribe(

      paginationObject => {

        this.pager = paginationObject.pager
        this.pageOfItems = paginationObject.pageOfItems
      
     
      }

    )



  }



  searchProducts(searchValue){

    let queryString = unescape(searchValue);
      
    this.router.navigate(['/inventario/fuera-de-stock/search'], {queryParams:  { q :  queryString, page: 1 }})

  }







}
