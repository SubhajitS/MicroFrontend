import { Component, OnInit, AfterViewInit } from '@angular/core';

declare function linkAppAssets(appName: string, cb: (directive: string) => void): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  appName = 'testapp';
  itemCount = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    linkAppAssets(this.appName, (directive: string) => {
      console.log(directive);
    });
  }

  kartChangedListener(event: CustomEvent) {
    this.itemCount = event.detail.length;
  }
}
