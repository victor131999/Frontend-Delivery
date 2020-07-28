import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//customers
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { CustomerListComponent } from './components/customer-main/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-main/customer-form/customer-form.component';
import { CustomerService } from './core/services/customer.service';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';

//locales
import { LocalMainComponent } from './components/local-main/local-main.component';
import { LocalListComponent } from './components/local-main/local-list/local-list.component';
import { LocalFormComponent } from './components/local-main/local-form/local-form.component';
import { LocalService } from './core/services/local.service';

//vehiculos
import { MotorizedMainComponent } from './components/motorized-main/motorized-main.component';
import { MotorizedListComponent } from './components/motorized-main/motorized-list/motorized-list.component';
import { MotorizedFormComponent } from './components/motorized-main/motorized-form/motorized-form.component';
import { MotorizedService } from './core/services/motorized.service';

//Ordenes
import { OrderMainComponent } from './components/order-main/order-main.component';
import { OrderListComponent } from './components/order-main/order-list/order-list.component';
import { OrderFormComponent } from './components/order-main/order-form/order-form.component';
import { OrderService } from './core/services/order.service';
import { OrderCardComponent } from './components/order-card/order-card.component';

import { ServiceInterceptor } from './core/interceptors/service.interceptor';
import { MasmasPipe } from './shared/pipes/masmas.pipe';

//paginacion
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    CustomerMainComponent,
    CustomerListComponent,
    CustomerFormComponent,
    CustomerCardComponent,

    LocalMainComponent,
    LocalListComponent,
    LocalFormComponent,


    MotorizedMainComponent,
    MotorizedListComponent,
    MotorizedFormComponent,
 

    OrderMainComponent,
    OrderListComponent,
    OrderFormComponent,
    OrderCardComponent,

    MasmasPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule 
  ],
  providers: [CustomerService, LocalService, MotorizedService, OrderService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ServiceInterceptor,
    multi: true
  }, {    
    provide: LOCALE_ID,
    useValue : 'es'    
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
