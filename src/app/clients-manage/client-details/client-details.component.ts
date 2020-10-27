import { Component, OnInit, Injectable } from '@angular/core';
import { ClientEditComponent } from "../client-edit/client-edit.component";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Client } from "../../interfaces-models/clients";
import { ClientsService } from "../../services/clients.service";


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client$: Observable<Client>

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router,
 
  ) { }

  ngOnInit(): void {
    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
      this.clientService.getOneClient(params.get('id')))
    )
    
    
  }











}
