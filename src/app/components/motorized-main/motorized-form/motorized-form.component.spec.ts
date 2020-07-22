import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizedFormComponent } from './motorized-form.component';

describe('MotorizedFormComponent', () => {
  let component: MotorizedFormComponent;
  let fixture: ComponentFixture<MotorizedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorizedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorizedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
