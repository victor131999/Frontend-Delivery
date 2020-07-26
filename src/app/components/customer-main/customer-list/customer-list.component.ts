import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  @Output() customerToEdit = new EventEmitter<Customer>();
  @Input() reloadList: Boolean; 
  @Output() reloadComplete = new EventEmitter<Boolean>();
 
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;  
  
  customers : Customer[];

  constructor(private customerService: CustomerService) { }



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
    this.customerService.list().subscribe(
      result => {        
        this.customers = result;                
        this.reloadComplete.emit(true);
      }
    );
  }

  update(customer: Customer) {    
    this.customerToEdit.emit(customer);
  }

retrieve(id: string) : void {
        this.customerService.retrieve(id).subscribe(
          customer =>{
            swal.fire({
          title: `<h4>${customer.name}</h4>`,
          html: `<dl class="dl-horizontal">
            <label>Nombre:</label><span>${customer.name}</span><br>
            <label>Direccion:</label><span>${customer.direction}</span><br>
            <label>Cedula:</label><span>${customer.identy}</span><br>
            <label>Actividad:</label><span>${customer.active}</span><br>
            <label>Telefono:</label><span>${customer.phone}</span><br>
          </dl>`,
          focusConfirm: false,
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }
  

  delete(customer: Customer) : void {
    swal.fire({
      title: '¿Está seguro?',
      text: `Se va a eliminar el registro de ${customer.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((option) => {
      if (option.value) {
        this.customerService.delete(customer.idcustomer).subscribe(
          result => {
            this.list();
          }
        );       
      }
    })
  }

}

