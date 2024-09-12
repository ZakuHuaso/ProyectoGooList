import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerEtiquetaPage } from './ver-etiqueta.page';

const routes: Routes = [
  {
    path: '',
    component: VerEtiquetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerEtiquetaPageRoutingModule {}
