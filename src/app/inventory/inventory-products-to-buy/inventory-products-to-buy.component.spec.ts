import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProductsToBuyComponent } from './inventory-products-to-buy.component';

describe('InventoryProductsToBuyComponent', () => {
  let component: InventoryProductsToBuyComponent;
  let fixture: ComponentFixture<InventoryProductsToBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryProductsToBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryProductsToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
