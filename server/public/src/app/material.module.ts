import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule,
  MdIconModule,
  MdGridListModule,
  MdOptionModule,
  MdDialogModule,
  MdInputModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule,
    MdGridListModule,
    MdOptionModule,
    MdDialogModule,
    MdInputModule
  ],
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule,
    MdGridListModule,
    MdOptionModule,
    MdDialogModule,
    MdInputModule
  ]
})
export class MaterialModule { }
