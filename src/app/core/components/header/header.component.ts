import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

/***
 * App header with theme control functionality.
 * @todo: Move that logic to a ThemeService.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _darkThemeEnabled: boolean;

  @HostBinding('attr.role') attrRole = 'navigation';

  @ViewChild('toggleThemeCheckbox', { static: true })
  toggleThemeCheckbox: ElementRef<HTMLInputElement>;

  /***
   * Controls the app theme.
   * @param value Enable dark theme.
   */
  set darkThemeEnabled(value: boolean) {
    this._darkThemeEnabled = value;
    this.doc.documentElement
      .setAttribute('data-theme', value ? 'dark' : 'light');
    this.toggleThemeCheckbox.nativeElement.checked = value;
  }

  get darkThemeEnabled() {
    return this._darkThemeEnabled;
  }

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document
  ) { }

  ngOnInit(): void {
    // @TODO: Wrap Window with an Injectable is a good practice.
    const darkThemeMql = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkThemeEnabled = darkThemeMql.matches;
  }

  /***
   * Toggle app theme state.
   * @todo: Move that logic to a ThemeService.
   */
  toggleTheme() {
    this.darkThemeEnabled = !this.darkThemeEnabled;
  }

}
