import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToselfComponent } from './toself.component';

describe('ToselfComponent', () => {
  let component: ToselfComponent;
  let fixture: ComponentFixture<ToselfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToselfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
