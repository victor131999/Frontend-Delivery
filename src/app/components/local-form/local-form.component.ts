import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from 'src/app/core/services/local.service';
import { Local } from 'src/app/shared/models/local';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.component.html',
  styleUrls: ['./local-form.component.css']
})
export class LocalFormComponent implements OnInit {

  faSave = faSave;
  faTimes = faTimes;
  faFont = faFont;
  faLowVision=faLowVision;
  faMortarPestle=faMortarPestle;
  faHourglass=faHourglass;
  faBars=faBars;
  faWindowMaximize=faWindowMaximize;
  faAlignCenter=faAlignCenter;

  local : Local;
  title : string;
  form: FormGroup;

  submitted = false;

  constructor(private LocalService: LocalService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.LocalService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.local = result;
                this.local.idlocal = params['id'];
                this.title = "Actualizando " + this.local.name;                
              }
            );
      }
      else {
        this.local = new Local();
        this.title = "Nuevo registro de local"
      }
    });

    this.form = this.formBuilder.group({
      name : ['', [Validators.required]],
      direction : ['', [Validators.required]]
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
    
    this.LocalService.save(this.local).subscribe(
        (result) => {                  
          this.submitted = false;
          if(result !== undefined)
          {
            if(result.icon === "success"){                            
              this.router.navigate(['local/list']);
              return;
            }                     
          }
        }        
      );    
  }

  onReset() {
    this.local = new Local();    
    this.form.reset();
    this.submitted = false;
  }

}
