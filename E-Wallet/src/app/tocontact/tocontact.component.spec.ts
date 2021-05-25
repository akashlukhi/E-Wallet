import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TocontactComponent } from './tocontact.component';

describe('TocontactComponent', () => {
  let component: TocontactComponent;
  let fixture: ComponentFixture<TocontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TocontactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TocontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
