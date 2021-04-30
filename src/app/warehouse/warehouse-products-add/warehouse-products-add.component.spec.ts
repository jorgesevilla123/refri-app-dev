import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductsAddComponent } from './warehouse-products-add.component';

describe('WarehouseProductsAddComponent', () => {
  let component: WarehouseProductsAddComponent;
  let fixture: ComponentFixture<WarehouseProductsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseProductsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
