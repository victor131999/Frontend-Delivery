import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Local } from 'src/app/shared/models/local';
import { LocalService } from 'src/app/core/services/local.service';
import { faEye, faPlus, faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css']
})
export class LocalListComponent implements OnInit {
  faTrash=faTrash;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;

  locals : Local[];  
  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  @Output() reloadComplete = new EventEmitter<Boolean>();
  constructor(private LocalService: LocalService) { }

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

  list(): void {
    this.LocalService.list(1,100).subscribe(
      result => {        
        this.locals = result;   
        this.reloadComplete.emit(true);     
      }
    );
  }

  delete(local: Local): void {
    swal.fire({
      title: '¿Está seguro?',
      text: `El registro de ${local.name} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((option) => {
      if (option.value) {
        this.LocalService.delete(local.idlocal).subscribe(
          result => {                        
            this.list();
          }
        );
      }
    });
  }

}
