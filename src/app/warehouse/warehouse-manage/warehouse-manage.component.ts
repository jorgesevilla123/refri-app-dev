import { Component, OnInit } from '@angular/core';
import { WarehouseService } from "../../services/warehouse.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Warehouse } from "../../interfaces-models/warehouses"
import { Products } from "../../interfaces-models/products"
import { HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DeleteWarehouseDialogComponent } from '../delete-warehouse-dialog/delete-warehouse-dialog.component';
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";



@Component({
  selector: 'app-warehouse-manage',
  templateUrl: './warehouse-manage.component.html',
  styleUrls: ['./warehouse-manage.component.css']
})
export class WarehouseManageComponent implements OnInit {

  warehouse: Warehouse
  products: any
  pager: any = {}
  page: number
  warehouseId: string
  warehouseName: string
  pageOfItems: Products[] = []
  isSearchParam: boolean

  constructor(
    public warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private alert: AlertService

  ) { }

  ngOnInit(): void {
    const urlParameters = combineLatest([this.route.params, this.route.queryParams])
    urlParameters.subscribe(
      params => {
        console.log(params);
        this.getWarehouse(params[0].id, params[1].page);
        this.warehouseId = params[0].id,
          this.warehouseName = params[0]['name?'];
      }
    )
  }






  getWarehouse(warehouseId, page) {
    this.warehouseService.getOneWarehouse(warehouseId, page).subscribe(
      warehouse => {
        this.warehouse = warehouse.warehouse,
          this.products = warehouse.pageOfItems,
          this.pager = warehouse.pager
        this.isSearchParam = false


      }
    )
  }


  onAdd() {

  }








  // Navigates to inventory route for searching
  searchProducts(queryKey) {
    let queryString = unescape(queryKey);
    console.log(this.warehouseId);
    console.log(this.warehouseName);
    console.log(queryString);
    this.router.navigate(['/almacenes/administrar-almacen/busqueda', this.warehouseId, this.warehouseName], { queryParams: { q: queryString, page: 1 } })
  }



  onEdit(product) {

  }


  onDelete(warehouse: Warehouse){
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.width = '40%'
    dialogConfig.data = warehouse
    const dialogRef = this.dialog.open(DeleteWarehouseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      warehouse => {
        if(warehouse.data.success) { 
          this.alert.notifySuccess(`${warehouse.data.message}`, 2500, 'top', 'center');
        }
        else {
          this.alert.notifyWarn(`${warehouse.data.message}`, 2500, 'top', 'center')
        }
      },
      err => {
        console.log(err)
      }
    )
  }





  onEditPhoto(product) {

  }








}
