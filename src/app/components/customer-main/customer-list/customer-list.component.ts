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
  @Input() flagToReload : Boolean;
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
    if(changes.flagToReload.currentValue){
      console.log("Flag changed to: " + this.flagToReload );
      if(this.flagToReload){
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

  update(customer: Customer) : void  {    
    console.log("Customer to edit:" + customer);
    this.customerToEdit.emit(customer);
  }


 retrievee(id: string) : void {
    this.customerService.retrievee(id).subscribe(
      customer =>{
        swal.fire({
      title: `<h4>${customer.name}</h4>`,
      html: `<dl class="dl-horizontal">
        <label>Nombre:</label><span>${customer.name}</span><br>
        <label>Direccion:</label><span>${customer.direction}</span><br>
        <label>Direccion:</label><span>${customer.identy}</span><br>
        <label>Direccion:</label><span>${customer.active}</span><br>
        <label>Direccion:</label><span>${customer.phone}</span><br>
      </dl>`,
      focusConfirm: false,
      confirmButtonText: 'Aceptar'
    })
  }
);
}

retrieve(customer: Customer) : void {
  swal.fire({
    title: `<h4>${customer.name}</h4>`,
    icon: 'info',
    confirmButtonText: 'Aceptar',
    html: `<hr><fieldset>
    <label>Nombre:</label><span>${customer.name}</span><br>
    <label>Direccion:</label><span>${customer.direction}</span><br>
    <label>Cedula:</label><span>${customer.identy}</span><br>
    <label>Actividad:</label><span>${customer.active}</span><br>
    <label>Telefono:</label><span>${customer.phone}</span><br>
</fieldset>`
  });
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
    }).then((result) => {
      if (result.value) {
        this.customerService.delete(customer.idcustomer).subscribe(
          result => {
            swal.fire(result);
            this.list();
          }
        );       
      }
    })
  }

}

