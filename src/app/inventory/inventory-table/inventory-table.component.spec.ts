import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryComponent } from './inventory-table.component';


describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(waitForAsync(() => {  
    TestBed.configureTestingModule({
      declarations: [ InventoryComponent ],
     
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
