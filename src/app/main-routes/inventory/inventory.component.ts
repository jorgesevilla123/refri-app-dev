import { Component, OnInit } from '@angular/core';

import { Products } from "../../products";
import { InventoryService } from "../../services/inventory.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products: Products[]

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getProducts();
    
  }

  getProducts(): void {
    this.inventoryService.getProducts()
    .subscribe(products => this.products = products);

  }

}
