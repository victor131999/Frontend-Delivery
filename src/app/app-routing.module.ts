import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

import { ChargeListComponent } from './components/charge-list/charge-list.component';
import { ChargeFormComponent } from './components/charge-form/charge-form.component';
import { ChargeCardComponent } from './components/charge-card/charge-card.component';

import { LocalListComponent } from './components/local-list/local-list.component';
import { LocalFormComponent } from './components/local-form/local-form.component';
import { LocalCardComponent } from './components/local-card/local-card.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { MotorizedListComponent } from './components/motorized-list/motorized-list.component';
import { MotorizedFormComponent } from './components/motorized-form/motorized-form.component';
import { MotorizedCardComponent } from './components/motorized-card/motorized-card.component';

import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { GraficaComponent } from './components/grafica/grafica.component';

const routes: Routes=[
  {path: '', redirectTo: '/',pathMatch: 'full'},
  {path: 'charge/list', component: ChargeListComponent},
  {path: 'charge/form', component: ChargeFormComponent},
  {path: 'charge/form/:id', component: ChargeFormComponent},
  {path: 'charge/card/:id', component: ChargeCardComponent},
  
  {path: 'local/list', component: LocalListComponent},
  {path: 'local/form', component: LocalFormComponent},
  {path: 'local/form/:id', component: LocalFormComponent},
  {path: 'local/card/:id', component: LocalCardComponent},

  {path: 'product/list', component: ProductListComponent},
  {path: 'product/form', component: ProductFormComponent},
  {path: 'product/form/:id', component: ProductFormComponent},
  {path: 'product/card/:id', component: ProductCardComponent},

  {path: 'motorized/list', component: MotorizedListComponent},
  {path: 'motorized/form', component: MotorizedFormComponent},
  {path: 'motorized/form/:id', component: MotorizedFormComponent},
  {path: 'motorized/card/:id', component: MotorizedCardComponent},

  {path: 'customer/list', component: CustomerListComponent},
  {path: 'customer/form', component: CustomerFormComponent},
  {path: 'customer/form/:id', component: CustomerFormComponent},
  {path: 'customer/card/:id', component: CustomerCardComponent},

  {path: 'signup', component: SignUpFormComponent},
  {path: 'login', component: LoginFormComponent},
  
  {path: 'grafica', component: GraficaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
