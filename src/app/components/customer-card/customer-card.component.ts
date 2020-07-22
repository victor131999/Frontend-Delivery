import { Component, OnInit } from '@angular/core';
import { faToggleOn,faAddressCard,faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad  } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit {
  faToggleOn=faToggleOn;
  faAddressCard=faAddressCard;
  faUser = faUser;    
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faAt = faAt;
  faRoad = faRoad;

  customer : Customer=new Customer(); 
  
  constructor(private customerService: CustomerService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.customerService.retrieve(params['id'])
            .subscribe(result => 
              {
              this.customer = result;
              this.customer.idcustomer=params['id'];
              this.getBills();
              }
              );
      }
    });    
  }

  getBills() : void {
    this.customerService.getBills(this.customer.idcustomer).subscribe(
      result => console.log(result)
    );
  }

}
