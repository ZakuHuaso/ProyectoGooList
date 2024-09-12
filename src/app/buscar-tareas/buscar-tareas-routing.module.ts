import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarTareasPage } from './buscar-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarTareasPageRoutingModule {}
