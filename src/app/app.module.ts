import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { AppComponent } from './app.component';
import { ResizableTableComponent } from './resizable-table/resizable-table.component';
import { DetailedElementComponent } from './detailed-element/detailed-element.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRouterModule } from './app-routing.module';
import { ResizeColumnDirective } from './resizable-table/resize-column.derective';

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
