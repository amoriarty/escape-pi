import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule,
  MdIconModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule
  ],
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule
  ]
})
export class MaterialModule { }
