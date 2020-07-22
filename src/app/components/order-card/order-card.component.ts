import { Component, OnInit } from '@angular/core';
import { faToggleOn,faAddressCard, faUser, faCalendar, faMapMarkedAlt, faPhone, faAt, faRoad, faSave, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/core/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
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

  order : Order; 
  
  constructor(private OrderService: OrderService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.OrderService.retrieve(params['id'])
            .subscribe(result => this.order = result);
      }
    });    
  }

}
