import { NgModule } from '@angular/core';
import { Routes, RouterModule, provideRouter } from '@angular/router';

import { ResizableTableComponent } from 'src/app/resizable-table/resizable-table.component';
import { DetailedElementComponent } from 'src/app/detailed-element/detailed-element.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', title: 'Elements Table', component: ResizableTableComponent },
  {
    path: 'element/:position',
    title: 'Detailed Element',
    component: DetailedElementComponent,
  },
  { path: '**', title: 'Page Not Found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)],
})
export class AppRouterModule {}
