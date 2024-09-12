import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarTareasPage } from './buscar-tareas.page';

describe('BuscarTareasPage', () => {
  let component: BuscarTareasPage;
  let fixture: ComponentFixture<BuscarTareasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
