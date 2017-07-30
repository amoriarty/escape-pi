import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule,
  MdIconModule,
  MdGridListModule,
  MdOptionModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule,
    MdGridListModule,
    MdOptionModule
  ],
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule,
    MdGridListModule,
    MdOptionModule
  ]
})
export class MaterialModule { }
