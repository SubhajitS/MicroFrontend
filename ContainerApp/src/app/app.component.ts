import { Component, OnInit, NgZone, OnChanges, SimpleChanges } from '@angular/core';

declare function linkAppAssets(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {

  itemCount: number = 0;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    console.log('App comp');
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {

        linkAppAssets();
      });
    }, 3000);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  kartChangedListener(event: CustomEvent) {
    this.itemCount = event.detail.length;
  }
}
