import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PaginatedParams {
  offset: number;
  itemsPerPage: number;
}

export class PaginatedList<T> {

  readonly items: T[] = [];
  offset = 0;
  hasNextPage = true;

  constructor(
    public readonly itemsPerPage: number,
    private readonly loadFn: (params: PaginatedParams) => Observable<T[]>
  ) { }

  load() {
    return this.loadFn({ offset: this.offset, itemsPerPage: this.itemsPerPage })
      .pipe(map(data => this.appendData(data)));
  }

  private appendData(items: T[]) {
    this.items.push(...items);
    this.hasNextPage = items.length === this.itemsPerPage;
    this.offset = this.offset + this.itemsPerPage;
    return this;
  }
}
