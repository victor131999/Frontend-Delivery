import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizedCardComponent } from './motorized-card.component';

describe('MotorizedCardComponent', () => {
  let component: MotorizedCardComponent;
  let fixture: ComponentFixture<MotorizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
