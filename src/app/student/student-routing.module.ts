import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { Error400Component } from '../shared/pages/error/error400/error400.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./components/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./shared/components/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
