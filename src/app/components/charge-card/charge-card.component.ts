import { Component, OnInit } from '@angular/core';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ChargeService } from 'src/app/core/services/charge.service';
import { Charge } from 'src/app/shared/models/charge';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-charge-card',
  templateUrl: './charge-card.component.html',
  styleUrls: ['./charge-card.component.css']
})
export class ChargeCardComponent implements OnInit {

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

  constructor(private ChargeService: ChargeService,     
    private activatedRoute : ActivatedRoute,
    private router: Router) {
      
               }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.ChargeService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.charge = result;
                this.charge.idcharge = params['id'];
                this.title = this.charge.date;                
              }
            );
      }
    });

  }

  toList() : void {
    this.router.navigate(['charge/list']);
  }


}
