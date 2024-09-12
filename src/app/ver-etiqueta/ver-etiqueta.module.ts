import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerEtiquetaPageRoutingModule } from './ver-etiqueta-routing.module';

import { VerEtiquetaPage } from './ver-etiqueta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerEtiquetaPageRoutingModule
  ],
  declarations: [VerEtiquetaPage]
})
export class VerEtiquetaPageModule {}
