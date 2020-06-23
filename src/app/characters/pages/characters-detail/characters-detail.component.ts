import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuoteDTO } from '../../characters.types';
import { Character } from '../../characters.models';
import { CharactersService } from '../../characters.service';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();
  character: Character;
  characterQuotes: QuoteDTO[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private characters: CharactersService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.$destroy))
      .subscribe(params => this.loadCharacter(params.id));
  }

  loadCharacter(id: number) {
    this.characters.getById(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe(data => {
        this.character = data;
        this.loadCharacterRelatedInfo(data);
      });
  }

  loadCharacterRelatedInfo(character: Character) {
    this.characters.getQuotesFromAuthor(character.name)
      .pipe(takeUntil(this.$destroy))
      .subscribe(data => this.characterQuotes = data);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  buildTwitterShareUrl(quote: QuoteDTO) {
    return `http://twitter.com/share?text=${quote.quote}. por: ${quote.author} em Breaking Bad.`;
  }

}
