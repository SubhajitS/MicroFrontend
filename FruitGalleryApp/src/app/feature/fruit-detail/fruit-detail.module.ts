import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FruitDetailComponent } from './fruit-detail.component';

@NgModule({
  declarations: [FruitDetailComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FruitDetailComponent]
})
export class FruitDetailModule { }
