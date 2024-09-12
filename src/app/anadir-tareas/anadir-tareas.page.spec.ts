import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirTareasPage } from './anadir-tareas.page';

describe('AnadirTareasPage', () => {
  let component: AnadirTareasPage;
  let fixture: ComponentFixture<AnadirTareasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
