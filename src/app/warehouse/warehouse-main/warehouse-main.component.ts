import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../services/warehouse.service';
import { Warehouse } from "../../interfaces-models/warehouses";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddWarehouseFormComponent } from '../add-warehouse-form/add-warehouse-form.component';
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";
import { DeleteWarehouseDialogComponent } from '../delete-warehouse-dialog/delete-warehouse-dialog.component';
import { WarehouseSettingComponent } from "../warehouse-setting/warehouse-setting.component"


@Component({
  selector: 'app-warehouse-main',
  templateUrl: './warehouse-main.component.html',
  styleUrls: ['./warehouse-main.component.css']
})
export class WarehouseMainComponent implements OnInit {

  warehouses: Warehouse[]


  constructor(
    public warehouseService: WarehouseService,
    public dialog: MatDialog,
    private alert: AlertService

  ) { }

  ngOnInit(): void {
    this.getWarehouses();
   

  }



  getWarehouses(): void {

    this.warehouseService.getWarehouse().subscribe(
      warehouse => {
        this.warehouses = warehouse
        console.log('executed')
      }
    )

  }


  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    const dialogRef = this.dialog.open(AddWarehouseFormComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data.success) {
          this.alert.notifySuccess(`Se ha creado el almacen ${res.data.warehouse.warehouse_name}`, 2500, 'top', 'center')

        }
        else {
          this.alert.notifyWarn(`Error creando el almacen`, 2500, 'top', 'center');
        }
      },
      err => {
        console.log(err)
      },
      () => { this.getWarehouses()}
    )
 
    
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
      },
      () => { this.getWarehouses(); }
    )
  
  }


  onEdit(warehouse: Warehouse){
    this.warehouseService.populateForm(warehouse);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = warehouse;
    const dialogRef = this.dialog.open(WarehouseSettingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => {
        if(res.data.success) {
          this.alert.notifySuccess(`${res.data.message}`, 2500, 'top', 'center')
        }
        else {
          this.alert.notifyWarn(`${res.data.message}`, 2500, 'top', 'center')
        }

      },
      err => {
        console.log(err)
      },
      () => { this.getWarehouses();} 
    )


  }







}
