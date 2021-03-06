import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLowVision,faMortarPestle,faHourglass,faBars,faWindowMaximize,faAlignCenter,faFont, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

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
  form: FormGroup;

  submitted = false;

  constructor(private ProductService: ProductService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.getToken();

    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.ProductService.retrieve(params['id'])
            .subscribe(result => 
              {
                this.product = result;
                this.product.idproduct = params['id'];
                this.title = "Actualizando " + this.product.name;                
              }
            );
      }
      else {
        this.product = new Product();
        this.title = "Nuevo registro de producto"
      }
    });

    this.form = this.formBuilder.group({
      name : ['', [Validators.required]],
      brand : ['', [Validators.required]],
      description : ['', [Validators.required]],
      cost : ['', [Validators.required]],
      typeiva : ['', [Validators.required]]
    });
  }

  get f(){
    return this.form.controls;
  }


  onSubmit(): void {      
    this.subtotal();
    console.log(this.product.subtotal);
    this.submitted = true;    
    
    if (this.form.invalid) {
        return;
    }
    
    this.ProductService.save(this.product, this.authService.tokenUser).subscribe(
        (result) => {                  
          this.submitted = false;
          if(result !== undefined)
          {
            if(result.icon === "success"){                            
              this.router.navigate(['product/list']);
              return;
            }                     
          }
        }        
      );    
  }

  onReset() {
    this.product = new Product();    
    this.form.reset();
    this.submitted = false;
  }

  subtotal(){
    if(this.product.typeiva=='Procesado'){
      this.product.subtotal=this.product.cost*0.12+this.product.cost;
    }else{
      return this.product.subtotal=this.product.cost;
    }
  }

}
