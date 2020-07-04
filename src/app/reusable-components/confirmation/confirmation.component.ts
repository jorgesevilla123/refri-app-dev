import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  


  constructor() { }


  ngOnInit(): void {
    this.message('Dialog title', 'create');

  
  }

  message(message: string, icon: string){
    document.getElementById('title').innerText = message;
    document.getElementById('icon').innerText = icon
  }




}
