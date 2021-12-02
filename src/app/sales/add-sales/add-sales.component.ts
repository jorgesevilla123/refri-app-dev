import { Component, OnInit, AfterViewInit, ViewChild , ElementRef, } from '@angular/core';
import {Observable, of, Subject,BehaviorSubject} from 'rxjs';
import {map, startWith, filter, take, debounceTime, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { InventoryService } from '../../services/inventory.service'







export interface State {
  flag: string;
  name: string;
  population: string;
}








@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})




export class AddSalesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'description', 'model', 'quantity', 'price'];
  filteredProducts: Observable<any[]>;
  stateCtrl = new FormControl();
  productsList = new MatTableDataSource()
  client: string
  isSelected: boolean
  dataSource: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  array$: Observable<any> = this.dataSource.asObservable();
  state: string[]
  products: any[]




  states: Observable<State[]> = of([
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ])






  constructor(
    private inventoryService: InventoryService
    
  ) { 
   
    this.filteredProducts = this.stateCtrl.valueChanges
    .pipe(
      debounceTime(500),
      tap(
        val => console.log(`Values before map: ${val}`)
      ),
      startWith(''),
      map(product => product ? this._filterStates(product) : this.products = []),
      tap(
        val => {
          if(val === undefined){
            console.log('no value')
          }
          else {
            console.log(`values after map:`)
          }
        }
      )
    );
 

  }


  

  @ViewChild('input') input: ElementRef




  ngAfterViewInit(){


  


  }






  ngOnInit(): void {
    this.getProducts();
    this.logProducts();


  }



  
  getProducts(){
    this.inventoryService.getPaginateProducts(1).subscribe(
      val => {
        console.log(val.pageItems)
      }
    )
  }

  logProducts(){
    console.log(this.products)
 
  }





  selectClient(){
    this.isSelected = true
  }


  goBack(){
    this.isSelected = false
  }


  selectProduct(state){
    // this.dataSource = new salesDataSource(this.state)
    // this.dataSource.addSales(state)
    
  }



  addValues(data) {
    this.array$.pipe(
      take(1),

    ).subscribe( val => {
      console.log(val)
      const newArr = [...val, data]
      this.dataSource.next(newArr);
    })
  }

 









  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(product => product.title.toLowerCase().includes(filterValue));
  }




}
