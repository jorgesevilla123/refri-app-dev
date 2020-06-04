import { Component, OnInit } from '@angular/core';

import { Products } from "../../products";
import { InventoryService } from "../../services/inventory.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['title', 'modelo', 'precio', 'cantidad']
  dataSource = this.getProducts();
  products: Products[]

  constructor(private inventoryService: InventoryService) { } //Injecting the service with DI

  ngOnInit() {
    this.inventoryService.getProducts().subscribe(
      list => {
        let array = list.map(item => {
          return {
            ...item.payload.val()
          }
        })

      }
    )
    
  }

  getProducts(): void {   //   Getting the products from the products service 
    this.inventoryService.getProducts()
    .subscribe(products => this.products = products);

  }

}
