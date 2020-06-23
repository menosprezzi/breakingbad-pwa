import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CORE_API_BASE_URL } from '@app/core/core.tokens';
import { PaginatedList } from '@app/utils/data/paginated-list';
import { Character } from '@app/characters/characters.models';

import { CharactersService } from './characters.service';

import * as getCharactersWithPaginationMock from './mocks/get-characters-with-pagination.json';

describe('CharactersService', () => {
  let httpTestingController: HttpTestingController;
  let service: CharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CORE_API_BASE_URL, useValue: 'http://mock.local/api/' }]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CharactersService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should paginate characters list', () => {
    service.listWithPagination()
      .subscribe(data => {
        expect(data).toBeInstanceOf(PaginatedList);
        expect(data.items[0]).toBeInstanceOf(Character);
      });

    const req = httpTestingController
      .expectOne('http://mock.local/api/characters?offset=0&limit=10');

    req.flush(getCharactersWithPaginationMock);
  });
});
