import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus,faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ChargeService } from 'src/app/core/services/charge.service';
import { Charge } from 'src/app/shared/models/charge';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/models/customer';
import { Motorized } from 'src/app/shared/models/motorized';
import { Local } from 'src/app/shared/models/local';
import { MotorizedService } from 'src/app/core/services/motorized.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { LocalService } from 'src/app/core/services/local.service';
import { Detail } from 'src/app/shared/models/detail';




@Component({
  selector: 'app-charge-form',
  templateUrl: './charge-form.component.html',
  styleUrls: ['./charge-form.component.css']
})
export class ChargeFormComponent implements OnInit {

  faSave = faSave;
  faTimes = faTimes;
  faFont = faFont;
  faLowVision=faLowVision;
  faMortarPestle=faMortarPestle;
  faHourglass=faHourglass;
  faBars=faBars;
  faWindowMaximize=faWindowMaximize;
  faAlignCenter=faAlignCenter;
  faPlus=faPlus;

  charge : Charge;
  title : string;
  form: FormGroup;

  submitted = false;

  customers:Customer[];
  motorizeds:Motorized[];
  locals:Local[];

  flagToQuery:Boolean = false;
  constructor(private ChargeService: ChargeService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private CustomerService:CustomerService,
    private MotorizedService:MotorizedService,
    private LocalService:LocalService) { }

  ngOnInit(): void {
    this.ComboMotorized();
    this.ComboCustomer();
    this.ComboLocal();
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.ChargeService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.charge = result;
                this.charge.idcharge = params['id'];
                this.title = "Actualizando " + this.charge.date;                
              }
            );
      }
      else {
        this.charge = new Charge();
        this.title = "Nuevo registro de Orden"
      }
    });

    this.form = this.formBuilder.group({
      idcustomer : ['', [Validators.required]],
      idmotorized : ['', [Validators.required]],
      idlocal : ['', [Validators.required]],
      state : ['', [Validators.required]],
      description : ['', [Validators.required]]
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
    console.log(this.charge);
    this.ChargeService.save(this.charge).subscribe(
        (result) => {                  
          this.submitted = false;
          if(result !== undefined)
          {
            if(result.icon === "success"){  
              let motoriz=new Motorized();
              this.motorizeds.filter(result=>{
                if(result.idmotorized===this.charge.idmotorized){
                  motoriz=result
                }
              })
              motoriz.disponibility="Ocupado"
              motoriz.Ordersplaced=motoriz.Ordersplaced+1;
              this.MotorizedService.save(motoriz).subscribe(result=>console.log(result))
              this.router.navigate(['charge/list']);
              return;
            }                     
          }
        }        
      );    
  }

  onReset() {
    this.charge = new Charge();    
    this.form.reset();
    this.submitted = false;
  }

    ComboCustomer(){
      this.CustomerService.ComboCustomer().subscribe(
        result=>{
          this.customers=result
        });
    }

    ComboMotorized(){
      this.MotorizedService.ComboMotorized().subscribe(
        result=>{
          this.motorizeds=result
        });
    }

    ComboLocal(){
      this.LocalService.ComboLocal().subscribe(
        result=>{
          this.locals=result
        });
    }
//------------------------------------------------------
addProduct($event){
 let detail=new Detail();
 detail.name=$event.name;
 detail.brand=$event.brand;
 detail.subtotal=$event.subtotal;
  this.charge.details.push(detail);
  this.Total();
}
//-------------------------------------------------------------

//-------------------------------------------------------------
Total(){
  let sum:number=0;
  this.charge.details.forEach(item=>  sum+=Number(item.subtotal))
  this.charge.total=sum;
  console.log(this.charge.total)
}


}
