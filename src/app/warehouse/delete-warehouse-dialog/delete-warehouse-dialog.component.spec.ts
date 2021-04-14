import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarehouseDialogComponent } from './delete-warehouse-dialog.component';

describe('DeleteWarehouseDialogComponent', () => {
  let component: DeleteWarehouseDialogComponent;
  let fixture: ComponentFixture<DeleteWarehouseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWarehouseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWarehouseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
