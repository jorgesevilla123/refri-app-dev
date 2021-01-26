import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { Products } from 'src/app/interfaces-models/products';


@Component({
  selector: 'app-inventory-low-stock',
  templateUrl: './inventory-low-stock.component.html',
  styleUrls: ['./inventory-low-stock.component.css']
})
export class InventoryLowStockComponent implements OnInit {

  products: Products[] | Products
  cantidad: number

  constructor(
    public inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.getLowStockProducts();
  }


  getLowStockProducts(){
    this.inventoryService.getLowStockProducts().subscribe(
      products => {
        this.products = products,
        this.cantidad = products.length
      }
    )

  }

}
