import { Component, OnInit } from '@angular/core';
import { Products } from '../../interfaces-models/products'
import { InventoryService } from "../../services/inventory.service";
import { WarehouseService } from "../../services/warehouse.service";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";

@Component({
  selector: 'app-warehouse-products-add',
  templateUrl: './warehouse-products-add.component.html',
  styleUrls: ['./warehouse-products-add.component.css']
})
export class WarehouseProductsAddComponent implements OnInit {
  productsAdded: any[] = []
  products: any

  constructor(
    public inventoryService: InventoryService,
    public router: Router,
    public route: ActivatedRoute,
    public warehouseService: WarehouseService 

  ) { }





 
  ngOnInit(): void {
    this.test();
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
      // logic for increasing quantity
      else {
          console.log(this.productsAdded[index]);
        if(this.productsAdded[index].cantidad >= 1){
          this.productsAdded[index].cantidad += 1
        }
      }
    
  }




  save(){
    console.log(this.productsAdded, 'productos guardados correctamente');
    
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



  searchProduct(){

  }

  test(){
    this.inventoryService.getPaginateProducts(1).subscribe(
      productsObj => {
       this.products = productsObj.pageItems
      }
    )

  }



}
