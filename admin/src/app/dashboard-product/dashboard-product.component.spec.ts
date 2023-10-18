import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductComponent } from './dashboard-product.component';

describe('DashboardComponent', () => {
  let component: DashboardProductComponent;
  let fixture: ComponentFixture<DashboardProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardProductComponent]
    });
    fixture = TestBed.createComponent(DashboardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
