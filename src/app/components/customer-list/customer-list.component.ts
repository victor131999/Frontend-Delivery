import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/core/services/customer.service';
import { faEye, faPlus, faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  faTrash=faTrash;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;

  customers : Customer[];  
  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  @Output() reloadComplete = new EventEmitter<Boolean>();
  constructor(private CustomerService: CustomerService) { }

  ngOnInit(): void {
    this.count();
  }

  init() : void{
    this.pages = [];    
    this.currentPage = 1;    
  }

  count(): void {
    this.CustomerService.count().subscribe(
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
    this.CustomerService.list(pg, this.limit).subscribe(
      result => {
        console.log(result);
        this.customers = result      
      }
    )
  }

  list(): void {
    this.CustomerService.list(1,100).subscribe(
      result => {        
        this.customers = result;   
        this.reloadComplete.emit(true);     
      }
    );
  }

  delete(customer: Customer): void {
    swal.fire({
      title: '¿Está seguro?',
      text: `El registro de ${customer.name} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((option) => {
      if (option.value) {
        this.CustomerService.delete(customer.idcustomer).subscribe(
          result => {                        
            this.list();
          }
        );
      }
    });
  }

}
