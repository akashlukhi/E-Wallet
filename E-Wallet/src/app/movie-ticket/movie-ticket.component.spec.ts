import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTicketComponent } from './movie-ticket.component';

describe('MovieTicketComponent', () => {
  let component: MovieTicketComponent;
  let fixture: ComponentFixture<MovieTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
