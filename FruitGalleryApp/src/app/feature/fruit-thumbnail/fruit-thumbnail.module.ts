import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FruitThumbnailComponent } from './fruit-thumbnail.component';



@NgModule({
  declarations: [FruitThumbnailComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FruitThumbnailComponent
  ]
})
export class FruitThumbnailModule { }
