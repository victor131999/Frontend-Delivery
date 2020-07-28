import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {

  faPlusCircle = faPlusCircle;

  mainCustomer : Customer;
  mainTitle : String;
  mainReload : Boolean;

  constructor() { }

  ngOnInit(): void {
    this.mainReload = false;
    this.onInit();    
  }

  onInit(){
    this.mainCustomer = new Customer();    
    this.mainTitle = "Registro de un nuevo cliente";    
  }

  reloadToDo($event){
    this.mainReload = $event;
    if(this.mainReload){
      console.log("Main call to reload list");    
    }    
    this.onInit();
  }

 /* update($event) : void {
    this.mainCustomer = $event;
    this.mainTitle = `Edición del cliente ${$event.name}`;
  }*/

  reloadDone($event){
    this.mainReload = !$event;    
  }
  
  /*reload($event) : void {
    this.mainCustomer = new Customer();
    this.mainTitle = "Registro de un nuevo cliente";
    this.mainReload = $event;    
  }*/
  mainUpdate($event){
    this.mainCustomer = $event;
    this.mainTitle = "Actualizar el registro de " + $event.name;
  }





}
