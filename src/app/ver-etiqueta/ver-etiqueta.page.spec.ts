import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEtiquetaPage } from './ver-etiqueta.page';

describe('VerEtiquetaPage', () => {
  let component: VerEtiquetaPage;
  let fixture: ComponentFixture<VerEtiquetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEtiquetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
