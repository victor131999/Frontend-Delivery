import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ChargeService } from 'src/app/core/services/charge.service';
import { Charge } from 'src/app/shared/models/charge';
import { ActivatedRoute, Router } from '@angular/router';

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

  charge : Charge;
  title : string;
  form: FormGroup;

  submitted = false;

  constructor(private ChargeService: ChargeService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

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
        this.title = "Nuevo registro de chargeo"
      }
    });

    this.form = this.formBuilder.group({
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
    
    this.ChargeService.save(this.charge).subscribe(
        (result) => {                  
          this.submitted = false;
          if(result !== undefined)
          {
            if(result.icon === "success"){                            
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

}
