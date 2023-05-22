import { NgModule } from '@angular/core';
import { Routes, RouterModule, provideRouter } from '@angular/router';

import { ResizableTableComponent } from 'src/app/resizable-table/resizable-table.component';
import { DetailedElementComponent } from 'src/app/detailed-element/detailed-element.component';

const routes: Routes = [
  { path: '', component: ResizableTableComponent },
  { path: 'element/:position', component: DetailedElementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)],
})
export class AppRouteringModule {}
