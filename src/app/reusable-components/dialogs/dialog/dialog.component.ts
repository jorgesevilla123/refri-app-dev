import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    
    private mdDialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  close(value) {
    this.mdDialogRef.close(value);
  }
  
  create() {
    this.close(true);
  }

  @HostListener('keydown.esc')
  onEsc() {
    this.close(false);
  }

}
