import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FruitThumbnailModule } from './feature/fruit-thumbnail/fruit-thumbnail.module';
import { FruitDetailModule } from './feature/fruit-detail/fruit-detail.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FruitThumbnailModule,
    FruitDetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
