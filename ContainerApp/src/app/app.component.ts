import { Component, OnInit, AfterViewInit } from '@angular/core';

declare function linkAppAssets(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  itemCount = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    linkAppAssets();
  }

  kartChangedListener(event: CustomEvent) {
    this.itemCount = event.detail.length;
  }
}
