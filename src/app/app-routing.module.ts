import { NgModule } from '@angular/core';
import { Routes, RouterModule, provideRouter } from '@angular/router';

import { ResizableTableComponent } from 'src/app/resizable-table/resizable-table.component';
import { DetailedElementComponent } from 'src/app/detailed-element/detailed-element.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ResizableTableComponent },
  { path: 'element/:position', component: DetailedElementComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)],
})
export class AppRouterModule {}
