import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { SalesInterface } from "../../../../models/sales-model";
import { Router, ActivatedRoute } from '@angular/router';







@Component({
  selector: 'app-sales-main',
  templateUrl: './sales-main.component.html',
  styleUrls: ['./sales-main.component.css']
})
export class SalesMainComponent implements OnInit {

  sales: any

  constructor(
    private salesService: SalesService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getSales();

  }


  getSales(){
    this.salesService.getSales().subscribe(
      sales => {
        this.sales = sales.sales
      }
    )
  }





  addSale(){
    this.router.navigate(['/ventas/hacer-venta']);
   
  }





}
