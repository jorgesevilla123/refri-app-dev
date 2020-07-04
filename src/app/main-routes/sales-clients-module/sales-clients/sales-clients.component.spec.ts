import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesClientsComponent } from './sales-clients.component';

describe('SalesClientsComponent', () => {
  let component: SalesClientsComponent;
  let fixture: ComponentFixture<SalesClientsComponent>;

  beforeEach(async(() => {
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
