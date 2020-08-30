import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { faEye} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  
  faEye=faEye;
  products:Product[];
  @Output() loadproducts=new EventEmitter<Product>(); 

  constructor(private productService:ProductService ) { }

  ngOnInit(): void {
    this.LoadProduct();
  }
  
  LoadProduct(){
    this.productService.loadProducts().subscribe(result=>this.products=result)
  }

  loadDetail(product:Product){
    this.loadproducts.emit(product)
  }

}
