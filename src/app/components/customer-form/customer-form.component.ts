import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

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
  form: FormGroup;

  submitted = false;

  constructor(private CustomerService: CustomerService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.CustomerService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.customer = result;
                this.customer.idcustomer = params['id'];
                this.title = "Actualizando " + this.customer.name;                
              }
            );
      }
      else {
        this.customer = new Customer();
        this.title = "Nuevo registro de customero"
      }
    });

    this.form = this.formBuilder.group({
      name : ['', [Validators.required]],
      direction : ['', [Validators.required]],
      identy : ['', [Validators.required]],
      active: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  get f(){
    return this.form.controls;
  }


  onSubmit(): void {      

    this.submitted = true;    
    
    if (this.form.invalid) {
        return;
    }
    
    this.CustomerService.save(this.customer).subscribe(
        (result) => {                  
          this.submitted = false;
          if(result !== undefined)
          {
            if(result.icon === "success"){                            
              this.router.navigate(['customer/list']);
              return;
            }                     
          }
        }        
      );    
  }

  onReset() {
    this.customer = new Customer();    
    this.form.reset();
    this.submitted = false;
  }

}
