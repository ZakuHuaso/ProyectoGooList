import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirTareasPageRoutingModule } from './anadir-tareas-routing.module';

import { AnadirTareasPage } from './anadir-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirTareasPageRoutingModule
  ],
  declarations: [AnadirTareasPage]
})
export class AnadirTareasPageModule {}
