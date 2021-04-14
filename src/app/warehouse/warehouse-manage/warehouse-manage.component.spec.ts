import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManageComponent } from './warehouse-manage.component';

describe('WarehouseManageComponent', () => {
  let component: WarehouseManageComponent;
  let fixture: ComponentFixture<WarehouseManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
