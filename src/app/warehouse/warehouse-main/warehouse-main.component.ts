import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../services/warehouse.service';
import { Warehouse } from "../../interfaces-models/warehouses";


@Component({
  selector: 'app-warehouse-main',
  templateUrl: './warehouse-main.component.html',
  styleUrls: ['./warehouse-main.component.css']
})
export class WarehouseMainComponent implements OnInit {

  warehouses: Warehouse[]

  constructor(
    public warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
  }



  getWarehouses(): void {

    this.warehouseService.getWarehouse().subscribe(
      warehouse => {
        this.warehouses = warehouse
      }
    )

  }

}
