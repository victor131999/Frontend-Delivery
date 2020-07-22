import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  @Output() OrderToEdit = new EventEmitter<Order>();
  @Input() reloadList: Boolean; 
  @Output() reloadComplete = new EventEmitter<Boolean>();
  
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;  
  
  orders : Order[];

  constructor(private OrderService: OrderService) { }

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
    this.OrderService.list().subscribe(
      result => {        
        this.orders = result;                
        this.reloadComplete.emit(true);
      }
    );
  }

  update(order: Order) {    
    this.OrderToEdit.emit(order);
  }


  retrieve(order: Order) : void {
    swal.fire({
      title: `<h4>Orden</h4>`,
      icon: 'info',
      confirmButtonText: 'Aceptar',
      html: `<hr><fieldset>
        <label>Nombre:</label><span>${order.subtotal}</span><br>
        <label>NRC:</label><span>${order.typeiva}</span><br>
        <label>Horas:</label><span>${order.aumont}</span><br>
        <label>Área:</label><span>${order.state}</span><br>
      </fieldset>`
    });
  }

  

  delete(order: Order) : void {
    swal.fire({
      title: '¿Está seguro?',
      text: `Se va a eliminar el registro de la orden`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((option) => {
      if (option.value) {
        this.OrderService.delete(order.idorder).subscribe(
          result => {
            this.list();
          }
        );       
      }
    })
  }

}

