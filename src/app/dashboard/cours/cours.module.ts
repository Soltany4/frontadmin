import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursRoutingModule } from './cours-routing.module';
import { CoursComponent } from './cours.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoursComponent
  ],
  imports: [
    CommonModule,
    CoursRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class CoursModule { }
