import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Shared
import { SharedModule } from '../shared/shared.module';
// Dynamictabview
import { DynamictabviewComponent } from '../dynamictabview/dynamictabview.component';
// Component
import { LayoutComponent } from './layout.component';
import { AppTopbarComponent } from './app.topbar/app.topbar.component';
import { AppMenuComponent } from './app.menu/app.menu.component';
import { AppFooterComponent } from './app.footer/app.footer.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AppTopbarComponent,
    AppMenuComponent,
    AppFooterComponent,
    DynamictabviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    LayoutComponent,
  ],
})
export class LayoutModule { }
