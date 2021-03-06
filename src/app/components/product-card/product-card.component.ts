import { Component, OnInit } from '@angular/core';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  faSave = faSave;
  faTimes = faTimes;
  faFont = faFont;
  faLowVision=faLowVision;
  faMortarPestle=faMortarPestle;
  faHourglass=faHourglass;
  faBars=faBars;
  faWindowMaximize=faWindowMaximize;
  faAlignCenter=faAlignCenter;

  product : Product;
  title : string;

  constructor(private ProductService: ProductService,     
    private activatedRoute : ActivatedRoute,
    private router: Router) {
      
               }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.ProductService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.product = result;
                this.product.idproduct = params['id'];
                this.title = this.product.name;                
              }
            );
      }
    });

  }

  toList() : void {
    this.router.navigate(['product/list']);
  }


}
