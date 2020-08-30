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
import { CustomerService } from './core/services/customer.service';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
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
import { ChargeService } from './core/services/charge.service';
import { ChargeFormComponent } from './components/charge-form/charge-form.component';
import { ChargeListComponent } from './components/charge-list/charge-list.component';
import { ChargeCardComponent } from './components/charge-card/charge-card.component';

import { ServiceInterceptor } from './core/interceptors/service.interceptor';
import { MasmasPipe } from './shared/pipes/masmas.pipe';

//paginacion
import { NgxPaginationModule } from 'ngx-pagination';

//Registro
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { AuthService } from './core/services/auth.service';

import { ChartsModule } from 'ng2-charts';
import { GraficaComponent } from './components/grafica/grafica.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';

@NgModule({
  declarations: [
    AppComponent,
    
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
 

    ChargeListComponent,
    ChargeFormComponent,
    ChargeCardComponent,

    MasmasPipe,

    SignUpFormComponent,

    GraficaComponent,

    DetailProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [AuthService,
    CustomerService,
    LocalService,ProductService,
    MotorizedService, ChargeService, {
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
