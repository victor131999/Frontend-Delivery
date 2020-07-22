import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'
import { Motorized } from 'src/app/shared/models/motorized';
import { MotorizedService } from 'src/app/core/services/motorized.service';

@Component({
  selector: 'app-motorized-list',
  templateUrl: './motorized-list.component.html',
  styleUrls: ['./motorized-list.component.css']
})
export class MotorizedListComponent implements OnInit {

  @Output() motorizedToEdit = new EventEmitter<Motorized>();
  @Input() reloadList: Boolean; 
  @Output() reloadComplete = new EventEmitter<Boolean>();
 
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;  
  
  motorizeds : Motorized[];

  constructor(private MotorizedService: MotorizedService) { }

  
  Initpage:number=1;

  ngOnInit(): void {
    this.list(); 
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.reloadList.currentValue){
      if(this.reloadList){
        this.list();
      }
    }
  }

  list() : void {
    this.MotorizedService.list().subscribe(
      result => {        
        this.motorizeds = result;                
        this.reloadComplete.emit(true);
      }
    );
  }

  update(motorized: Motorized) {    
    this.motorizedToEdit.emit(motorized);
  }

retrieve(id: string) : void {
        this.MotorizedService.retrieve(id).subscribe(
          motorized =>{
            swal.fire({
          title: `<h4>${motorized.name}</h4>`,
          html: `<dl class="dl-horizontal">
            <label>Nombre:</label><span>${motorized.name}</span><br>
            <label>Direccion:</label><span>${motorized.vehicle}</span><br>
          </dl>`,
          focusConfirm: false,
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }
  

  delete(motorized: Motorized) : void {
    swal.fire({
      title: '¿Está seguro?',
      text: `Se va a eliminar el registro de ${motorized.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((option) => {
      if (option.value) {
        this.MotorizedService.delete(motorized.idmotorized).subscribe(
          result => {
            this.list();
          }
        );       
      }
    })
  }

}

