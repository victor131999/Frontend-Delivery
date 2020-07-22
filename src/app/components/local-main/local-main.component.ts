import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Local } from 'src/app/shared/models/local';

@Component({
  selector: 'app-local-main',
  templateUrl: './local-main.component.html',
  styleUrls: ['./local-main.component.css']
})
export class LocalMainComponent implements OnInit {

  faPlusCircle = faPlusCircle;

  mainLocal : Local;
  mainTitle : String;
  mainReload : Boolean;

  constructor() { }

  ngOnInit(): void {
    this.mainReload = false;
    this.mainLocal = new Local();
    this.mainTitle = "Registro de un nuevo local";
  }

  update($event) : void {
    this.mainLocal = $event;
    this.mainTitle = `Edición del local ${$event.name}`;
  }

  reload($event) : void {
    this.mainLocal = new Local();
    this.mainTitle = "Registro de un nuevo local";
    this.mainReload = $event;    
  }


  reloadDone($event){
    this.mainReload = !$event;    
  }

}
