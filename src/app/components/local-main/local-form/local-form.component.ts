import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHome,faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import swal from 'sweetalert2'
import { Local } from 'src/app/shared/models/local';
import { LocalService } from 'src/app/core/services/local.service';

@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.component.html',
  styleUrls: ['./local-form.component.css']
})
export class LocalFormComponent implements OnInit {
  faHome=faHome;
  faUser = faUser;    
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faAt = faAt;
  faRoad = faRoad;
  faSave = faSave;
  faTimes = faTimes;

  formLocal: FormGroup;
  @Input() local: Local;    
  @Input() title : String;
  @Output() listToReload = new EventEmitter<Boolean>();

  submitted = false;
       
  constructor(private LocalService: LocalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {    
    this.formLocal = this.formBuilder.group({
      name : ['',[Validators.required]],
      direction : ['', [Validators.required]]
    });                   
  }
  
  save(): void {       
    this.submitted = true;
    
    if (this.formLocal.invalid) {
        return;
    }
    
    this.LocalService.save(this.local).subscribe(
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
    this.local = new Local();
    this.submitted = false;
    this.formLocal.reset();
  }

}