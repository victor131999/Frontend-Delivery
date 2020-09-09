import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBarrasComponent } from './grafica_barras.component';

describe('GraficaBarrasComponent', () => {
  let component: GraficaBarrasComponent;
  let fixture: ComponentFixture<GraficaBarrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaBarrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaBarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
