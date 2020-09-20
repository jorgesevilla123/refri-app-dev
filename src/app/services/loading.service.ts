import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})



// Service for handleling requests and showing a load spinner
export class LoadingService {

  loading$: Subject<boolean> = new Subject();

  constructor() { }


  startLoading(){
    this.loading$.next(true);
  }

  stopLoading(){
    this.loading$.next(false)
  }
}
