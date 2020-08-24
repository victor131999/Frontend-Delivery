import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { faEye, faPlus, faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  faTrash=faTrash;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;

  products : Product[];  
  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  @Output() reloadComplete = new EventEmitter<Boolean>();
  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.count();
  }

  init() : void{
    this.pages = [];    
    this.currentPage = 1;    
  }

  count(): void {
    this.ProductService.count().subscribe(
      result => {        
        console.log(result);
        this.numberDocs = result.numberDocs;                           
        this.calcNumberPages();
      }
    );
  }

  calcNumberPages() {   
    this.init();    
    this.numberPages = Math.floor(this.numberDocs / this.limit);
    this.numberPages++;            
    for (let index = 1; index <= this.numberPages; index++) {            
      this.pages.push(index);
    }    
    this.loadPage(this.currentPage);
  }

  changeLimit($event){
    this.limit = $event.target.value;
    this.calcNumberPages();
  }

  loadPage(pg : number){    
    this.currentPage = pg;    
    this.ProductService.list(pg, this.limit).subscribe(
      result => {
        console.log(result);
        this.products = result      
      }
    )
  }

  list(): void {
    this.ProductService.list(1,100).subscribe(
      result => {        
        this.products = result;   
        this.reloadComplete.emit(true);     
      }
    );
  }

  delete(product: Product): void {
    swal.fire({
      title: '¿Está seguro?',
      text: `El registro de ${product.name} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((option) => {
      if (option.value) {
        this.ProductService.delete(product.idproduct).subscribe(
          result => {                        
            this.list();
          }
        );
      }
    });
  }

}
