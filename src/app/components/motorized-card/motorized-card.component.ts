import { Component, OnInit } from '@angular/core';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MotorizedService } from 'src/app/core/services/motorized.service';
import { Motorized } from 'src/app/shared/models/motorized';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-motorized-card',
  templateUrl: './motorized-card.component.html',
  styleUrls: ['./motorized-card.component.css']
})
export class MotorizedCardComponent implements OnInit {

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

  constructor(private MotorizedService: MotorizedService,     
    private activatedRoute : ActivatedRoute,
    private router: Router) {
      
               }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.MotorizedService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.motorized = result;
                this.motorized.idmotorized = params['id'];
                this.title = this.motorized.name;                
              }
            );
      }
    });

  }

  toList() : void {
    this.router.navigate(['motorized/list']);
  }


}
