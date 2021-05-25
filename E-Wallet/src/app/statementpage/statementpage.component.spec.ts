import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementpageComponent } from './statementpage.component';

describe('StatementpageComponent', () => {
  let component: StatementpageComponent;
  let fixture: ComponentFixture<StatementpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
