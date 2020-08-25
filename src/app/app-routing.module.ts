import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';

import { OrderMainComponent } from './components/order-main/order-main.component';
import { OrderCardComponent } from './components/order-card/order-card.component';

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


const routes: Routes=[
  {path: '', redirectTo: '/',pathMatch: 'full'},
  {path: 'customer',component:CustomerMainComponent},
  {path: 'customer/:id',component:CustomerCardComponent},
  
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

  {path: 'order',component:OrderMainComponent},
  {path: 'order/:id',component:OrderCardComponent},

  {path: 'signup', component: SignUpFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
