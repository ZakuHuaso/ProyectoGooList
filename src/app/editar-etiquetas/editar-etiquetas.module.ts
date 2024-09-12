import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarEtiquetasPageRoutingModule } from './editar-etiquetas-routing.module';

import { EditarEtiquetasPage } from './editar-etiquetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarEtiquetasPageRoutingModule
  ],
  declarations: [EditarEtiquetasPage]
})
export class EditarEtiquetasPageModule {}
