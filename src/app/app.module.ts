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
import { LocalService } from './core/services/local.service';
import { LocalFormComponent } from './components/local-form/local-form.component';
import { LocalListComponent } from './components/local-list/local-list.component';
import { LocalCardComponent } from './components/local-card/local-card.component';

//vehiculos
import { MotorizedFormComponent } from './components/motorized-form/motorized-form.component';
import { MotorizedListComponent } from './components/motorized-list/motorized-list.component';
import { MotorizedCardComponent } from './components/motorized-card/motorized-card.component';
import { MotorizedService } from './core/services/motorized.service';

//Productos
import { ProductService } from './core/services/product.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

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

    LocalListComponent,
    LocalFormComponent,
    LocalCardComponent,

    ProductListComponent,
    ProductFormComponent,
    ProductCardComponent,

    MotorizedListComponent,
    MotorizedFormComponent,
    MotorizedCardComponent,
 

    OrderMainComponent,
    OrderListComponent,
    OrderFormComponent,
    OrderCardComponent,

    MasmasPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule 
  ],
  providers: [CustomerService, LocalService,ProductService, MotorizedService, OrderService, {
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
