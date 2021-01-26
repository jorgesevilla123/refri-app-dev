import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutOfStockComponent } from './inventory-out-of-stock.component';

describe('InventoryOutOfStockComponent', () => {
  let component: InventoryOutOfStockComponent;
  let fixture: ComponentFixture<InventoryOutOfStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryOutOfStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryOutOfStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
