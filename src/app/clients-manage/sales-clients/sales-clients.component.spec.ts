import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesClientsComponent } from './sales-clients.component';

describe('SalesClientsComponent', () => {
  let component: SalesClientsComponent;
  let fixture: ComponentFixture<SalesClientsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
