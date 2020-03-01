import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { KartItem } from './kartItem';

@Injectable({
  providedIn: 'root'
})
export class KartService {

  private $kartItems: BehaviorSubject<Array<KartItem>> = new BehaviorSubject(undefined);
  constructor() { }

  get kartItems(): Observable<Array<KartItem>> {
    return this.$kartItems.asObservable();
  }

  addItemToKart(item: KartItem) {
    let allItems = [];
    if (this.$kartItems.value) {
      const existingItem = this.$kartItems.value.find(x => x.fruitId === item.fruitId);
      if (existingItem) {
        existingItem.count += 1;
        allItems = [...this.$kartItems.value.filter(x => x.fruitId !== item.fruitId), existingItem];
      } else {
        allItems = [...this.$kartItems.value, item];
      }
    } else {
      allItems.push(item);
    }
    this.$kartItems.next(allItems);
  }
}
