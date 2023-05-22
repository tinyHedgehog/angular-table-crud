import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { ResizableTableComponent } from './resizable-table/resizable-table.component';
import { ResizeColumnDirective } from './resizable-table/resize-column.derective';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-routing.module';
import { DetailedElementComponent } from './detailed-element/detailed-element.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRouterModule,
  ],
  declarations: [
    AppComponent,
    ResizableTableComponent,
    ResizeColumnDirective,
    DetailedElementComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
