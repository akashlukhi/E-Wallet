import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToaccountComponent } from './toaccount.component';

describe('ToaccountComponent', () => {
  let component: ToaccountComponent;
  let fixture: ComponentFixture<ToaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
