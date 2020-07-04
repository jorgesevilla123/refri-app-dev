import { Component, OnInit } from '@angular/core';
import { InventoryService } from "../../../services/inventory.service";

@Component({
  selector: 'app-inventory-image-edit',
  templateUrl: './inventory-image-edit.component.html',
  styleUrls: ['./inventory-image-edit.component.css']
})
export class InventoryImageEditComponent implements OnInit {


  imagePath;

  constructor(
    public inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
  }


  editPhoto(){
    const formData = new FormData();
    let id = this.inventoryService.photoForm.get('_id').value;
    formData.append('_id', id)
    formData.append('newImage', this.imagePath);
    this.inventoryService.editProductPhoto(formData);
  }


  onFileUpload(event){
    const file = event.target.files[0];
    this.imagePath = file;
    



  }

}
