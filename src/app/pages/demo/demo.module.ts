import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
// Shared
import { SharedModule } from '../../shared/shared.module';
// Component
import { RoutelistComponent } from './routelist/routelist.component';
import { ReportPDFComponent } from './report-pdf/report-pdf.component';

@NgModule({
  declarations: [
    RoutelistComponent,
    ReportPDFComponent,
    
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule,
  ]
})
export class DemoModule { }
