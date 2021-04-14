import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouseFormComponent } from './add-warehouse-form.component';

describe('AddWarehouseFormComponent', () => {
  let component: AddWarehouseFormComponent;
  let fixture: ComponentFixture<AddWarehouseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWarehouseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWarehouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
