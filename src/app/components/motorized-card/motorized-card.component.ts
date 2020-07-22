import { Component, OnInit } from '@angular/core';
import { faAlignJustify,faCar,faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad  } from '@fortawesome/free-solid-svg-icons';
import { Motorized } from 'src/app/shared/models/motorized';
import { MotorizedService } from 'src/app/core/services/motorized.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-motorized-card',
  templateUrl: './motorized-card.component.html',
  styleUrls: ['./motorized-card.component.css']
})
export class MotorizedCardComponent implements OnInit {
  faCar=faCar;
  faAlignJustify=faAlignJustify;
  faUser = faUser;    
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faAt = faAt;
  faRoad = faRoad;

  motorized : Motorized; 
  
  constructor(private MotorizedService: MotorizedService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.MotorizedService.retrieve(params['id'])
            .subscribe(result => this.motorized = result);
      }
    });    
  }

}
