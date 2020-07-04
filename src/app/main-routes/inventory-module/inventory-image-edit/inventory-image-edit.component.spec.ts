import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryImageEditComponent } from './inventory-image-edit.component';

describe('InventoryImageEditComponent', () => {
  let component: InventoryImageEditComponent;
  let fixture: ComponentFixture<InventoryImageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryImageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
