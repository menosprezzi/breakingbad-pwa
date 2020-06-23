import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CORE_API_BASE_URL } from '@app/core/core.tokens';
import { PaginatedList, PaginatedParams } from '@app/utils/data/paginated-list';

import { Character } from './characters.models';
import { CharacterDTO, QuoteDTO } from './characters.types';

/***
 * Provides access to the Characters Domain.
 */
@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    @Inject(CORE_API_BASE_URL) private API_BASE_URL: string,
    private http: HttpClient
  ) { }

  /***
   * Retrieves a character by id.
   * @todo: Endpoint returning an array payload. Why?
   * @param id The character id to get.
   */
  getById(id: number) {
    return this.http.get<CharacterDTO[]>(this.API_BASE_URL + 'characters/' + id)
      .pipe(map(res => new Character().deserialize(res[0])));
  }

  /***
   * Retrieves all characters with pagination.
   * @param limit Limit how many items per page.
   */
  listWithPagination(limit: number = 10) {
    const paginatedCharacterList =
      new PaginatedList<Character>(limit, params => this.loadPage(params));
    return paginatedCharacterList.load();
  }

  /***
   * Fetch the next page of Characters from a PaginatedList.
   * @param params The params from a PaginatedList
   */
  loadPage(params: PaginatedParams) {
    return this.http.get<CharacterDTO[]>(this.API_BASE_URL + 'characters', {
      params: {
        offset: params.offset.toString(),
        limit: params.itemsPerPage.toString()
      }
    }).pipe(map(res => res.map(char => new Character().deserialize(char))));
  }

  /***
   * Find characters that matches a desired name filter.
   * @todo: API doesnt support dirty search (fulltext).
   * @param searchPredicate The text predicate to filter.
   */
  searchByName(searchPredicate: string) {
    const matchRegexp = new RegExp(`${searchPredicate.toLowerCase()}`);

    return this.http.get<CharacterDTO[]>(this.API_BASE_URL + 'characters')
      .pipe(map(res => (
        res.filter(char => matchRegexp.test(char.name.toLowerCase()))
          .map(char => new Character().deserialize(char))
      )));
  }

  /***
   * Retrieves a list of Quotes from an specific author.
   * @param author The name of the Character to filter.
   */
  getQuotesFromAuthor(author: string) {
    return this.http.get<QuoteDTO[]>(this.API_BASE_URL + 'quote', {
      params: {
        author
      }
    });
  }

}
