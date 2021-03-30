import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryManageProductsComponent } from './inventory-manage-products.component';

describe('InventoryCreateProductComponent', () => {
  let component: InventoryManageProductsComponent;
  let fixture: ComponentFixture<InventoryManageProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryManageProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
