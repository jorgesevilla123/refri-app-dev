import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { BusinessConfigurationsService } from "../../services/business-configurations.service";
import { Currency } from "../../interfaces-models/currency";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/en-DE";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { AlertService } from "../../reusable-components/alerts/alert/alert.service";



registerLocaleData(localeDe, 'fr');



@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
displayedColumns: string[] = ['Precio', 'Fecha']   //Order of the columns
@ViewChild(MatPaginator) paginator : MatPaginator


listData: MatTableDataSource<any>

currency: Currency

  public chart: Currency[]
 

  currencyForm: FormGroup = new FormGroup({
    precio: new FormControl()

  })

  constructor(
    private config: BusinessConfigurationsService,
    public alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getCurrency();
    this.displayCurrencyTable();
 




  }


  getCurrency(): void {
    this.config.getCurrency()
    .subscribe(currency => this.currency = currency); 
  }


  addCurrency(){
    const value = this.currencyForm.get('precio').value;
    const formData = new FormData();
    formData.append('precio', value);
    this.config.addCurrency(formData).subscribe(
      currency => {
        if(currency) {
          this.alert.notifySuccess(`Cambio actualizado a ${currency.precio}`, 2500, 'top', 'center')
          this.currencyForm.reset();
          setTimeout( () => {
            location.reload()
          }, 1500)
          

        } else {
          this.alert.notifySuccess('No se ha actualizado el cambio', 2500, 'top', 'center')
        }


      }
    )
  
    
  }


  displayCurrencyTable(){
    this.config.getCurrencies().subscribe(
      currencies => {
        let currenciesArray = currencies.map(values => {
          return {
            ...values
          }
        })
        this.listData = new MatTableDataSource(currenciesArray);
        this.listData.paginator = this.paginator
      }
    )
  }



}
