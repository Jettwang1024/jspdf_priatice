import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/system/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
{
  path: '',
  component: PagesComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: '',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
      path: 'system',
      loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
    }, {
      path: 'demo',
      loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule),
    }, {
      path: '**',
      loadChildren: () => import('./notfound/notfound.module').then(m => m.NotfoundModule),
    },
    {
      path: 'purchase/product',
      loadChildren: () => import('../pages/purchase/product/product.component').then(m => m.ProductComponent),
    },
    // 其他子路由
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
