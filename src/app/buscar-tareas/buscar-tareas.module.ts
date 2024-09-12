import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarTareasPageRoutingModule } from './buscar-tareas-routing.module';

import { BuscarTareasPage } from './buscar-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarTareasPageRoutingModule
  ],
  declarations: [BuscarTareasPage]
})
export class BuscarTareasPageModule {}
