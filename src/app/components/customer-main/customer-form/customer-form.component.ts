import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faToggleOn,faAddressCard, faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  faToggleOn=faToggleOn;
  faUser = faUser;    
  faAddressCard=faAddressCard;
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faAt = faAt;
  faRoad = faRoad;
  faSave = faSave;
  faTimes = faTimes;

  @Input() customer: Customer;    
  @Input() title : String;
  @Output() listToReload = new EventEmitter<Boolean>();

  formCustomer: FormGroup;
  submitted = false;
       
  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {    
    this.formCustomer = this.formBuilder.group({
      name : ['',[Validators.required]],
      direction : ['', [Validators.required]],
      identy : ['',[Validators.required]],
      active : ['',[Validators.required]],
      phone : ['',[Validators.required]]
    });                   
  }
  
  save(): void {       
    this.submitted = true;
    
    if (this.formCustomer.invalid) {
        return;
    }
    
    this.customerService.save(this.customer).subscribe(
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
    this.customer = new Customer();
    this.submitted = false;
    this.formCustomer.reset();
  }

}