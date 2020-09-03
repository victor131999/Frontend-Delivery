import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Charge } from 'src/app/shared/models/charge';
import { ChargeService } from 'src/app/core/services/charge.service';
import { faEye, faPlus, faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.css']
})
export class ChargeListComponent implements OnInit {
  faTrash=faTrash;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;

  charges : Charge[];  
  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  @Output() reloadComplete = new EventEmitter<Boolean>();
  constructor(private ChargeService: ChargeService,private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.getToken();
    this.count();
  }

  init() : void{
    this.pages = [];    
    this.currentPage = 1;    
  }

  count(): void {
    this.ChargeService.count().subscribe(
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
    this.ChargeService.list(pg, this.limit, this.authService.tokenUser).subscribe(
      result => {
        console.log(result);
        this.charges = result      
      }
    )
  }

  list(): void {
    this.ChargeService.list(1,100, this.authService.tokenUser).subscribe(
      result => {        
        this.charges = result;   
        this.reloadComplete.emit(true);     
      }
    );
  }

  delete(charge: Charge): void {
    swal.fire({
      title: '¿Está seguro?',
      text: `El registro de ${charge.date} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((option) => {
      if (option.value) {
        this.ChargeService.delete(charge.idcharge).subscribe(
          result => {                        
            this.list();
          }
        );
      }
    });
  }

}
