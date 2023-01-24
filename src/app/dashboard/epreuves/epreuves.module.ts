import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpreuvesRoutingModule } from './epreuves-routing.module';
import { EpreuvesComponent } from './epreuves.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EpreuvesComponent
  ],
  imports: [
    CommonModule,
    EpreuvesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EpreuvesModule { }
