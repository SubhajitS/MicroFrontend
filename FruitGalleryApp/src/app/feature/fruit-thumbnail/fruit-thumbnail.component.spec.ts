import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitThumbnailComponent } from './fruit-thumbnail.component';

describe('FruitThumbnailComponent', () => {
  let component: FruitThumbnailComponent;
  let fixture: ComponentFixture<FruitThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
