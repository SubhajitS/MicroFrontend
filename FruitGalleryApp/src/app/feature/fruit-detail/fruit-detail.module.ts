import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FruitDetailComponent } from './fruit-detail.component';



@NgModule({
  declarations: [FruitDetailComponent],
  imports: [
    CommonModule
  ],
  exports: [FruitDetailComponent]
})
export class FruitDetailModule { }
