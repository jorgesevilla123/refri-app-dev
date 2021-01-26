import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProductSearchComponent } from './sales-product-search.component';

describe('SalesProductSearchComponent', () => {
  let component: SalesProductSearchComponent;
  let fixture: ComponentFixture<SalesProductSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesProductSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
