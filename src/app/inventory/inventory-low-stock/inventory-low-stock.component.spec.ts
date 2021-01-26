import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLowStockComponent } from './inventory-low-stock.component';

describe('InventoryLowStockComponent', () => {
  let component: InventoryLowStockComponent;
  let fixture: ComponentFixture<InventoryLowStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryLowStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLowStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
