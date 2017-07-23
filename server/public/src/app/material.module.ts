import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule,
  MdIconModule,
  MdGridListModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule,
    MdGridListModule
  ],
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule,
    MdGridListModule
  ]
})
export class MaterialModule { }
