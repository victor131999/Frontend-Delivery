import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalMainComponent } from './local-main.component';

describe('LocalMainComponent', () => {
  let component: LocalMainComponent;
  let fixture: ComponentFixture<LocalMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
