import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesProductSearchComponent } from './sales-product-search.component';

describe('SalesProductSearchComponent', () => {
  let component: SalesProductSearchComponent;
  let fixture: ComponentFixture<SalesProductSearchComponent>;

  beforeEach(waitForAsync(() => {
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
