import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBillComponent } from './card-bill.component';

describe('CardBillComponent', () => {
  let component: CardBillComponent;
  let fixture: ComponentFixture<CardBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
