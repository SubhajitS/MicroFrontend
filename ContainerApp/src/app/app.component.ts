import { Component, OnInit } from '@angular/core';

declare function linkAppAssets(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  itemCount: number = 0;

  ngOnInit() {
    linkAppAssets();
  }

  kartChangedListener(event: CustomEvent) {
    this.itemCount = event.detail.length;
  }
}
