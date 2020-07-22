import { Component, OnInit } from '@angular/core';
import { faToggleOn,faAddressCard, faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad, faSave, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { Local } from 'src/app/shared/models/local';
import { LocalService } from 'src/app/core/services/local.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-local-card',
  templateUrl: './local-card.component.html',
  styleUrls: ['./local-card.component.css']
})
export class LocalCardComponent implements OnInit {
  faHome=faHome;
  faToggleOn=faToggleOn;
  faUser = faUser;    
  faAddressCard=faAddressCard;
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faAt = faAt;
  faRoad = faRoad;
  faSave = faSave;
  faTimes = faTimes;

  local : Local; 
  
  constructor(private localService: LocalService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.localService.retrieve(params['id'])
            .subscribe(result => this.local = result);
      }
    });    
  }

}
