import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { CharactersDetailComponent } from './pages/characters-detail/characters-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CharactersListComponent
  },
  {
    path: ':id',
    component: CharactersDetailComponent
  }
];

/***
 * Characters Domain's router.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
