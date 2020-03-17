import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { take, mergeMap } from 'rxjs/operators';
import { Fruit } from 'src/app/fruit';
import { ActivatedRoute, Router } from '@angular/router';
import { KartService } from 'src/app/kart.service';
import { KartItem } from 'src/app/kartItem';

@Component({
  selector: 'app-fruit-detail',
  templateUrl: './fruit-detail.component.html',
  styleUrls: ['./fruit-detail.component.scss']
})
export class FruitDetailComponent implements OnInit {

  fruit: Fruit;
  selectedPortion: string;
  constructor(private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private kartService: KartService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(mergeMap(x =>
      this.dataService.getFruitDetails(+x.get('id'))
    )).pipe(take(1)).subscribe(x => this.fruit = x);
  }

  addToCart() {
    const item: KartItem = { fruitId: this.fruit.id, count: 1, portion: this.selectedPortion };
    this.kartService.addItemToKart(item);
  }

  backToGallery() {
    this.router.navigate([{ outlets: { galleryOutlet: 'gallery' }}]);
  }
}
