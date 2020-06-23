import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { CharactersDetailComponent } from './pages/characters-detail/characters-detail.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharactersRoutingModule } from './characters-routing.module';


/***
 * Characters Domain's Module.
 */
@NgModule({
  declarations: [
    CharactersListComponent,
    CharacterCardComponent,
    CharactersDetailComponent
  ],
  imports: [
      CharactersRoutingModule,
      CommonModule,
      HttpClientModule,
      FormsModule,
  ]
})
export class CharactersModule { }
