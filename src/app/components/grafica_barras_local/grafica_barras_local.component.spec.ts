import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBarrasLocalComponent } from './grafica_barras_local.component';

describe('GraficaBarrasLocalComponent', () => {
  let component: GraficaBarrasLocalComponent;
  let fixture: ComponentFixture<GraficaBarrasLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaBarrasLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaBarrasLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
