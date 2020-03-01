import { Component, OnInit } from '@angular/core';
import { Fruit } from 'src/app/fruit';
import { DataService } from 'src/app/data.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fruit-thumbnail',
  templateUrl: './fruit-thumbnail.component.html',
  styleUrls: ['./fruit-thumbnail.component.scss']
})
export class FruitThumbnailComponent implements OnInit {

  allFruits: Array<Fruit>;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getFruitsForThumbnail().pipe(take(1)).subscribe(x => this.allFruits = x);
  }

  showDetails(id: number) {
    this.router.navigate([{ outlets: { galleryOutlet: ['detail', id] } }]);
  }
}
