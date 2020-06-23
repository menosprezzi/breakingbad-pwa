import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { PaginatedList } from '@app/utils/data/paginated-list';

import { Character } from '../../characters.models';
import { CharactersService } from '../../characters.service';


@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();

  $searchKeyInput = new Subject<string>();
  searchText?: string;
  charactersListPagination?: PaginatedList<Character>;
  charactersSearchResultList?: Character[];

  constructor(
    private characters: CharactersService
  ) { }

  ngOnInit() {
    this.characters.listWithPagination()
      .pipe(takeUntil(this.$destroy))
      .subscribe(data => this.charactersListPagination = data);

    this.$searchKeyInput
      .pipe(debounceTime(2000))
      .subscribe(searchPredicate => this.searchByName(searchPredicate));
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  loadMore() {
    if (this.charactersListPagination) {
      this.charactersListPagination.load()
        .pipe(takeUntil(this.$destroy))
        .subscribe(data => this.charactersListPagination = data);
    }
  }

  searchByName(searchPredicate: string) {
    this.characters.searchByName(searchPredicate)
      .pipe(takeUntil(this.$destroy))
      .subscribe(data => this.charactersSearchResultList = data);
  }

  clearSearch() {
    this.searchText = undefined;
    this.charactersSearchResultList = undefined;
  }

}
