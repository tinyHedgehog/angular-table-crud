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
import { AppRouteringModule } from './app-routing.module';
import { DetailedElementComponent } from './detailed-element/detailed-element.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRouteringModule,
  ],
  declarations: [
    AppComponent,
    ResizableTableComponent,
    ResizeColumnDirective,
    DetailedElementComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
