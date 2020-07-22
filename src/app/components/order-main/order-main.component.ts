import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.css']
})
export class OrderMainComponent implements OnInit {

  faPlusCircle = faPlusCircle;

  mainOrder : Order;
  mainTitle : String;
  mainReload : Boolean;

  constructor() { }

  ngOnInit(): void {
    this.mainReload = false;
    this.mainOrder = new Order();
    this.mainTitle = "Registro de una nueva orden";
  }

  update($event) : void {
    this.mainOrder = $event;
    this.mainTitle = `Edición de la orden ${$event.name}`;
  }

  reload($event) : void {
    this.mainOrder = new Order();
    this.mainTitle = "Registro de una nueva orden";
    this.mainReload = $event;    
  }


  reloadDone($event){
    this.mainReload = !$event;    
  }

}
