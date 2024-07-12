import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Component
import { NotfoundComponent } from '../notfound/notfound.component';
import { ChangepswComponent } from './changepsw/changepsw.component';
import { ProductComponent } from '../../../app/pages/purchase/product/product.component';

const routes: Routes = [
  { path: '', redirectTo: '404', pathMatch: 'full' },
  {
    path: 'changepsw',
    component: ChangepswComponent,
  },
  { path: '404', component: NotfoundComponent },
  { path: 'product', component: ProductComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
