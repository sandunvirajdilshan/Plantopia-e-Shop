import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarProductComponent } from './navbar-product.component';

describe('NavbarProductComponent', () => {
  let component: NavbarProductComponent;
  let fixture: ComponentFixture<NavbarProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarProductComponent]
    });
    fixture = TestBed.createComponent(NavbarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
