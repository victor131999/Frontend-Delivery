import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Motorized } from 'src/app/shared/models/motorized';
import { MotorizedService } from 'src/app/core/services/motorized.service';
import { faEye, faPlus, faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-motorized-list',
  templateUrl: './motorized-list.component.html',
  styleUrls: ['./motorized-list.component.css']
})
export class MotorizedListComponent implements OnInit {
  faTrash=faTrash;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;

  motorizeds : Motorized[];  
  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  @Output() reloadComplete = new EventEmitter<Boolean>();
  constructor(private MotorizedService: MotorizedService,private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.getToken();
    this.count();
  }

  init() : void{
    this.pages = [];    
    this.currentPage = 1;    
  }

  count(): void {
    this.MotorizedService.count().subscribe(
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

  motorizedLimit($event){
    this.limit = $event.target.value;
    this.calcNumberPages();
  }

  loadPage(pg : number){    
    this.currentPage = pg;    
    this.MotorizedService.list(pg, this.limit, this.authService.tokenUser).subscribe(
      result => {
        console.log(result);
        this.motorizeds = result      
      }
    )
  }

  list(): void {
    this.MotorizedService.list(1,100, this.authService.tokenUser).subscribe(
      result => {        
        this.motorizeds = result;   
        this.reloadComplete.emit(true);     
      }
    );
  }

  delete(motorized: Motorized): void {
    swal.fire({
      title: '¿Está seguro?',
      text: `El registro de ${motorized.owner} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((option) => {
      if (option.value) {
        this.MotorizedService.delete(motorized.idmotorized).subscribe(
          result => {                        
            this.list();
          }
        );
      }
    });
  }

}
