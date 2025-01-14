import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { DashboardRoutingModule } from './dashboard-routing.module';
// Component
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
