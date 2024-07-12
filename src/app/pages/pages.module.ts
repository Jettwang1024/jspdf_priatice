import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    LayoutModule,
  ],
})
export class PagesModule { }
