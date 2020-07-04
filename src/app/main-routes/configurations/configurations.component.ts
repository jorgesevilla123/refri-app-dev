import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { BusinessConfigurationsService } from "../../services/business-configurations.service";
import { Currency } from "../../currency";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/en-DE";

registerLocaleData(localeDe, 'fr');



@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
currency: Currency
 

  currencyForm: FormGroup = new FormGroup({
    precio: new FormControl()

  })

  constructor(
    private config: BusinessConfigurationsService
  ) { }

  ngOnInit(): void {
    this.getCurrency();
  }


  getCurrency(): void {
    this.config.getCurrency()
    .subscribe(currency => this.currency = currency); 
  }


  addCurrency(){
    const value = this.currencyForm.get('precio').value;
    const formData = new FormData();
    formData.append('precio', value);
    this.config.addCurrency(formData);
    this.currencyForm.reset();
    location.reload();
    
    
  }



}
