import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProductEditComponent } from './inventory-product-edit.component';

describe('InventoryProductEditComponent', () => {
  let component: InventoryProductEditComponent;
  let fixture: ComponentFixture<InventoryProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
