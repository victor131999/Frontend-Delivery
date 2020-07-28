import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHome,faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import swal from 'sweetalert2'
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  faHome=faHome;
  faUser = faUser;    
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faAt = faAt;
  faRoad = faRoad;
  faSave = faSave;
  faTimes = faTimes;

  formOrder: FormGroup;
  @Input() order: Order;    
  @Input() title : String;
  @Output() listToReload = new EventEmitter<Boolean>();

  submitted = false;
       
  constructor(private OrderService: OrderService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {    
    this.formOrder = this.formBuilder.group({
      typeiva : ['', [Validators.required]],
      aumont : ['',[Validators.required]],
      state : ['', [Validators.required]]
    });                   
  }
  
  save(): void {       
    this.submitted = true;
    
    if (this.formOrder.invalid) {
        return;
    }
    
    this.OrderService.save(this.order).subscribe(
        (result) => {        
          this.submitted = false;
          if(result !== undefined)
          {
            if(result.icon === "success"){              
              this.listToReload.emit(true);
              return;
            }                     
          }
        }        
      );    
  }

  onReset() {
    this.order = new Order();
    this.submitted = false;
    this.formOrder.reset();
  }

}