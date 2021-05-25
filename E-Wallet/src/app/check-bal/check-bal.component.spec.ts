import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBalComponent } from './check-bal.component';

describe('CheckBalComponent', () => {
  let component: CheckBalComponent;
  let fixture: ComponentFixture<CheckBalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
