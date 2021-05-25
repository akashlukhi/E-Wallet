import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToreqComponent } from './toreq.component';

describe('ToreqComponent', () => {
  let component: ToreqComponent;
  let fixture: ComponentFixture<ToreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToreqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
