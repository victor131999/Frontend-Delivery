import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faToggleOn,faAddressCard, faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import swal from 'sweetalert2'
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
  //@Output() listToReload = new EventEmitter<Boolean>();
  @Output() flagToReload = new EventEmitter<Boolean>();
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

  get f(){
    return this.formCustomer.controls;
  }

  onReset(): void  {
    this.formCustomer.reset();
    this.submitted = false;
  }

  /*save(): void {       
    this.submitted = true;
    
    if (this.formCustomer.invalid) {
        return;
    }
    
    this.CustomerService.save(this.customer).subscribe(
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
  }*/
  onSubmit() : void {
    this.submitted = true;

    if(this.formCustomer.invalid){
      console.log('Form invalid');
      return;        
    }

    this.customerService.save(this.customer).subscribe(
      result => {
        this.submitted = false;

        if(result.icon === "success"){
          swal.fire(result);                  
          this.flagToReload.emit(true);          
          return;
        }
        
        swal.fire(result);
    });
  }



}