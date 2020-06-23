import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';

/***
 * Core module with Apps's API and Layout.
 */
@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
    LayoutComponent
  ],
})
export class CoreModule { }
