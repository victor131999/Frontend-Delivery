import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faAlignJustify,faCar,faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Motorized } from 'src/app/shared/models/motorized';
import { MotorizedService } from 'src/app/core/services/motorized.service';

@Component({
  selector: 'app-motorized-form',
  templateUrl: './motorized-form.component.html',
  styleUrls: ['./motorized-form.component.css']
})
export class MotorizedFormComponent implements OnInit {
  faCar=faCar;
  faAlignJustify=faAlignJustify;
  faUser = faUser;    
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faAt = faAt;
  faRoad = faRoad;
  faSave = faSave;
  faTimes = faTimes;

  formMotorized: FormGroup;
  @Input() motorized: Motorized;    
  @Input() title : String;
  @Output() listToReload = new EventEmitter<Boolean>();

  submitted = false;
       
  constructor(private MotorizedService: MotorizedService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {    
    this.formMotorized = this.formBuilder.group({
      name : ['',[Validators.required]],
      vehicle : ['', [Validators.required]]
    });                   
  }
  
  save(): void {       
    this.submitted = true;
    
    if (this.formMotorized.invalid) {
        return;
    }
    
    this.MotorizedService.save(this.motorized).subscribe(
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
    this.motorized = new Motorized();
    this.submitted = false;
    this.formMotorized.reset();
  }

}