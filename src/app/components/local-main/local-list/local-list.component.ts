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

  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  constructor(private LocalService: LocalService,private Group: FormBuilder) { }


  ngOnInit(): void {
    this.count();
  }

  init() : void{
    this.pages = [];    
    this.currentPage = 1;    
  }
  count(): void {
    this.LocalService.count().subscribe(
      result => {        
        console.log(result);
        this.numberDocs = result.numberDocs;                           
        this.calcNumberPages();
      }
    );
  }

  calcNumberPages() {   
    this.init();    
    this.numberPages = Math.floor(this.numberDocs / this.limit);
    this.numberPages++;            
    for (let index = 1; index <= this.numberPages; index++) {            
      this.pages.push(index);
    }    
    this.loadPage(this.currentPage);
  }
  changeLimit($event){
    this.limit = $event.target.value;
    this.calcNumberPages();
  }

  loadPage(pg : number){    
    this.currentPage = pg;    
    this.LocalService.list(pg, this.limit).subscribe(
      result => {
        console.log(result);
        this.locals = result      
      }
    )
  }
  list() : void {
    this.LocalService.list(1,100).subscribe(
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

