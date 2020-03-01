import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import {take} from 'rxjs/operators';
import { Fruit } from 'src/app/fruit';

@Component({
  selector: 'app-fruit-detail',
  templateUrl: './fruit-detail.component.html',
  styleUrls: ['./fruit-detail.component.scss']
})
export class FruitDetailComponent implements OnInit {

  ngOnInit() {}

}
