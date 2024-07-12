import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ChangepswComponent } from './changepsw/changepsw.component';
//

@NgModule({
  declarations: [
    ChangepswComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
  ]
})
export class SystemModule { }
