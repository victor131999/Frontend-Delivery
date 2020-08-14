import { Component, OnInit } from '@angular/core';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from 'src/app/core/services/local.service';
import { Local } from 'src/app/shared/models/local';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-local-card',
  templateUrl: './local-card.component.html',
  styleUrls: ['./local-card.component.css']
})
export class LocalCardComponent implements OnInit {

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

  constructor(private LocalService: LocalService,     
    private activatedRoute : ActivatedRoute,
    private router: Router) {
      
               }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.LocalService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.local = result;
                this.local.idlocal = params['id'];
                this.title = this.local.name;                
              }
            );
      }
    });

  }

  toList() : void {
    this.router.navigate(['local/list']);
  }


}
