import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTicketComponent } from './bus-ticket.component';

describe('BusTicketComponent', () => {
  let component: BusTicketComponent;
  let fixture: ComponentFixture<BusTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
