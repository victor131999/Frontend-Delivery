import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizedMainComponent } from './motorized-main.component';

describe('MotorizedMainComponent', () => {
  let component: MotorizedMainComponent;
  let fixture: ComponentFixture<MotorizedMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorizedMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorizedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
