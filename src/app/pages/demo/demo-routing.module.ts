import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { NotfoundComponent } from '../notfound/notfound.component';
import { RoutelistComponent } from './routelist/routelist.component';
import { ReportPDFComponent } from './report-pdf/report-pdf.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: '404', pathMatch: 'full' },
  {
    path: 'routelist',
    component: RoutelistComponent,
  },
  {
    path: 'reportpdf',
    component: ReportPDFComponent,
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    MatDialogModule,
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
