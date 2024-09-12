import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEtiquetasPage } from './editar-etiquetas.page';

describe('EditarEtiquetasPage', () => {
  let component: EditarEtiquetasPage;
  let fixture: ComponentFixture<EditarEtiquetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEtiquetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
