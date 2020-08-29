import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MotorizedService } from 'src/app/core/services/motorized.service';
import { Motorized } from 'src/app/shared/models/motorized';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-motorized-form',
  templateUrl: './motorized-form.component.html',
  styleUrls: ['./motorized-form.component.css']
})
export class MotorizedFormComponent implements OnInit {

  faSave = faSave;
  faTimes = faTimes;
  faFont = faFont;
  faLowVision=faLowVision;
  faMortarPestle=faMortarPestle;
  faHourglass=faHourglass;
  faBars=faBars;
  faWindowMaximize=faWindowMaximize;
  faAlignCenter=faAlignCenter;

  motorized : Motorized;
  title : string;
  form: FormGroup;

  submitted = false;

  constructor(private MotorizedService: MotorizedService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.MotorizedService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.motorized = result;
                this.motorized.idmotorized = params['id'];
                this.title = "Actualizando " + this.motorized.brand;                
              }
            );
      }
      else {
        this.motorized = new Motorized();
        this.title = "Nuevo registro de vehiculo"
      }
    });

    this.form = this.formBuilder.group({
      owner : ['', [Validators.required]],
      brand : ['', [Validators.required]],
      vehicle : ['', [Validators.required]],
      disponibility : ['', [Validators.required]]
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
    
    this.MotorizedService.save(this.motorized).subscribe(
        (result) => {                  
          this.submitted = false;
          if(result !== undefined)
          {
            if(result.icon === "success"){                            
              this.router.navigate(['motorized/list']);
              return;
            }                     
          }
        }        
      );    
  }

  onReset() {
    this.motorized = new Motorized();    
    this.form.reset();
    this.submitted = false;
  }

}
