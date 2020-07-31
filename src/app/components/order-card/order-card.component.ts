import { Component, OnInit } from '@angular/core';
import { faToggleOn,faAddressCard, faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad, faSave, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Bill } from 'src/app/shared/models/bill';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/core/services/customer.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { BillService } from 'src/app/core/services/bill.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  faHome=faHome;
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
  
  order : Order = new Order(); 
  bill : Bill = new Bill();
  bills : Bill[];
  customers :Customer[];
  formRegs: FormGroup;
  submitted = false;
  
  constructor(private OrderService: OrderService, 
              private CustomerService: CustomerService, 
              private BillService: BillService, 
              private formBuilder: FormBuilder,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.OrderService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.order = result;
                this.order.idorder = params['id'];
                this.getBills();
                this.getCustomers();
              }
            );
      }
    });
    
    this.formRegs = this.formBuilder.group({
      customerid: ['',  [Validators.required]],
      product: ['', [Validators.required]], 
      description: ['', [Validators.required]],   
      quantity: ['', [Validators.required]]        
    });

    
  }

  getBills() : void {
    this.OrderService.getBills(this.order.idorder).subscribe(
      result => {
        console.log(result);
        this.bills = result;
      }
    );
  }

  getCustomers() : void {
    this.CustomerService.list().subscribe(
      result => {
        console.log(result);
        this.customers = result;
      }
    );
  }

  get f(){
    return this.formRegs.controls;
  }

  onSubmit() : void {
    this.submitted = true;
    
    if (this.formRegs.invalid) {
        return;
    }

    this.bill.orderid = this.order.idorder;
    this.BillService.save(this.bill).subscribe(
      result => {
        console.log(result); 
        this.submitted = false;         
      }
    );

  }

  onReset() : void {
    this.submitted = false;

  }
}