import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { KartService } from './kart.service';
import { Subscription } from 'rxjs';
import { KartItem } from './kartItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @Output() kartChanged: EventEmitter<KartItem[]> = new EventEmitter();

  title = 'FruitGalleryApp';
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private kartService: KartService) { }

  ngOnInit() {
    this.router.navigate([{ outlets: { galleryOutlet: 'gallery' } }]);

    this.subscriptions.push(this.kartService.kartItems.subscribe(x => {
      if (x) {
        this.kartChanged.emit(x);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
