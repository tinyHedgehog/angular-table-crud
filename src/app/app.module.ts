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
import { AppRouterModule } from './router/router.module';
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
    AppRouterModule,
  ],
  entryComponents: [ResizableTableComponent],
  declarations: [
    AppComponent,
    ResizableTableComponent,
    ResizeColumnDirective,
    DetailedElementComponent,
  ],
  bootstrap: [AppComponent, ResizableTableComponent],
})
export class AppModule {}
