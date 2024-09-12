import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarEtiquetasPage } from './editar-etiquetas.page';

const routes: Routes = [
  {
    path: '',
    component: EditarEtiquetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarEtiquetasPageRoutingModule {}
