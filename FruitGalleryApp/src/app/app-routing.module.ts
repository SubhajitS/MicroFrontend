import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { Route, RouterModule } from '@angular/router';
import { FruitDetailComponent } from './feature/fruit-detail/fruit-detail.component';
import { FruitThumbnailComponent } from './feature/fruit-thumbnail/fruit-thumbnail.component';

const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gallery'
    },
    {
        path: 'gallery',
        outlet: 'galleryOutlet',
        component: FruitThumbnailComponent
    },
    {
        path: 'detail/:id',
        outlet: 'galleryOutlet',
        component: FruitDetailComponent
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
