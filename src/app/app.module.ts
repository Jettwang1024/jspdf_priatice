import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// component
import { AppComponent } from './app.component';
// routing
import { AppRoutingModule } from './app-routing.module';
// shared
import { SharedModule } from './shared/shared.module';
// HttpInterceptor
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
// Service
import { AuthinterceptorService } from './interceptors/authinterceptor.service';
import { ContenttypeinterceptorService } from './interceptors/contenttypeinterceptor.service';
import { CustomheaderinterceptorService } from './interceptors/customheaderinterceptor.service';
import { ErrorinterceptorService } from './interceptors/errorinterceptor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from './pages/demo/report-pdf/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ProductsService } from './service/system/product.service';

//
// https://stackoverflow.com/questions/45975675/lazy-loading-browsermodule-has-already-been-loaded
// Import BrowserModule, BrowserAnimationsModule, HttpModule or HttpClientModule only once, preferably in your root module.
@NgModule({
  declarations: [
    AppComponent,
    Dialog,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    MatDialogModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ContenttypeinterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomheaderinterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorinterceptorService,
      multi: true
    },

    DatePipe,
    ProductsService,
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
