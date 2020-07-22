import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { LocalMainComponent } from './components/local-main/local-main.component';
import { LocalCardComponent } from './components/local-card/local-card.component';
import { MotorizedMainComponent } from './components/motorized-main/motorized-main.component';
import { MotorizedCardComponent } from './components/motorized-card/motorized-card.component';
import { OrderMainComponent } from './components/order-main/order-main.component';
import { OrderCardComponent } from './components/order-card/order-card.component';


const routes: Routes=[
  {path: '', redirectTo: '/',pathMatch: 'full'},
  {path: 'customer',component:CustomerMainComponent},
  {path: 'customer/:id',component:CustomerCardComponent},
  {path: 'local',component:LocalMainComponent},
  {path: 'local/:id',component:LocalCardComponent},
  {path: 'motorized',component:MotorizedMainComponent},
  {path: 'motorized/:id',component:MotorizedCardComponent},
  {path: 'order',component:OrderMainComponent},
  {path: 'order/:id',component:OrderCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
