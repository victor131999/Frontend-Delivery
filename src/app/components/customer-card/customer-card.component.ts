import { Component, OnInit } from '@angular/core';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit {

  faSave = faSave;
  faTimes = faTimes;
  faFont = faFont;
  faLowVision=faLowVision;
  faMortarPestle=faMortarPestle;
  faHourglass=faHourglass;
  faBars=faBars;
  faWindowMaximize=faWindowMaximize;
  faAlignCenter=faAlignCenter;

  customer : Customer;
  title : string;

  constructor(private CustomerService: CustomerService,     
    private activatedRoute : ActivatedRoute,
    private router: Router) {
      
               }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.CustomerService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.customer = result;
                this.customer.idcustomer = params['id'];
                this.title = this.customer.name;                
              }
            );
      }
    });

  }

  toList() : void {
    this.router.navigate(['customer/list']);
  }


}
