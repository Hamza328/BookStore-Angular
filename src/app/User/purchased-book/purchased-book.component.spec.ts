import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedBookComponent } from './purchased-book.component';

describe('PurchasedBookComponent', () => {
  let component: PurchasedBookComponent;
  let fixture: ComponentFixture<PurchasedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
