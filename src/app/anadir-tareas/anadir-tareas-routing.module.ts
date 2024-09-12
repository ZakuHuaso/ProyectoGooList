import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirTareasPage } from './anadir-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirTareasPageRoutingModule {}
