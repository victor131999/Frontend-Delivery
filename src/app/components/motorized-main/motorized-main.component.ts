import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Motorized } from 'src/app/shared/models/motorized';

@Component({
  selector: 'app-motorized-main',
  templateUrl: './motorized-main.component.html',
  styleUrls: ['./motorized-main.component.css']
})
export class MotorizedMainComponent implements OnInit {

  faPlusCircle = faPlusCircle;

  mainMotorized : Motorized;
  mainTitle : String;
  mainReload : Boolean;

  constructor() { }

  ngOnInit(): void {
    this.mainReload = false;
    this.mainMotorized = new Motorized();
    this.mainTitle = "Registro de un nuevo vehiculo";
  }

  update($event) : void {
    this.mainMotorized = $event;
    this.mainTitle = `Edición del vehiculo ${$event.name}`;
  }

  reload($event) : void {
    this.mainMotorized = new Motorized();
    this.mainTitle = "Registro de un nuevo vehiculo";
    this.mainReload = $event;    
  }


  reloadDone($event){
    this.mainReload = !$event;    
  }

}
