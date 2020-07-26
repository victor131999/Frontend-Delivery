import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'
import { Local } from 'src/app/shared/models/local';
import { LocalService } from 'src/app/core/services/local.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css']
})
export class LocalListComponent implements OnInit {
  queryForm:FormGroup;
  @Output() localToEdit = new EventEmitter<Local>();
  @Input() reloadList: Boolean; 
  @Output() reloadComplete = new EventEmitter<Boolean>();
  
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;  
  
  locals : Local[];
  limit:number;
  last:number;
  constructor(private LocalService: LocalService,private Group: FormBuilder) { }


  ngOnInit(): void {
   // this.list(); 
   this.queryForm=this.Group.group({
    limit: ['',[Validators.required]],
    });
    this.limit=5;
    this.last=0;
    this.listPage(this.limit,this.last);
  }

  next(){
    if(this.limit>this.locals.length){
      return "Fin";
    }else{
      this.last=this.limit+this.last;
      console.log(this.last);
    this.listPage(this.limit,this.last);
    }
  }

  ant(){
    if(this.limit<0){
      return "Fin";
    }
    this.last=this.last-this.limit;
    console.log(this.last);
    this.listPage(this.limit,this.last);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.reloadList.currentValue){
      if(this.reloadList){
        this.list();
      }
    }
  }

  list() : void {
    this.LocalService.list().subscribe(
      result => {      
          
        this.locals = result;                
        this.reloadComplete.emit(true);
      }
    );
  }

  listPage(limit:number,last:number) : void {
    this.LocalService.listPage(limit,last).subscribe(
      result => {      
        this.locals = result;                
        this.reloadComplete.emit(true);
      }
    );
  }

  update(local: Local) {    
    this.localToEdit.emit(local);
  }

retrieve(id: string) : void {
        this.LocalService.retrieve(id).subscribe(
          local =>{
            swal.fire({
          title: `<h4>${local.name}</h4>`,
          html: `<dl class="dl-horizontal">
            <label>Nombre:</label><span>${local.name}</span><br>
            <label>Direccion:</label><span>${local.direction}</span><br>
          </dl>`,
          focusConfirm: false,
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }
  

  delete(local: Local) : void {
    swal.fire({
      title: '¿Está seguro?',
      text: `Se va a eliminar el registro de ${local.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((option) => {
      if (option.value) {
        this.LocalService.delete(local.idlocal).subscribe(
          result => {
            this.list();
          }
        );       
      }
    })
  }

}

