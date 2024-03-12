import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import{faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]
  productMessage: undefined|string;
  icon= faTrash;
  editIcon= faEdit;
constructor(private product: ProductService){}
ngOnInit(): void {
    this.list();
}

deleteProduct(id:any){
console.warn(id);
this.product.deleteProduct(id).subscribe((result)=>{
  if(result){
this.productMessage='Product is deleted'
this.list();
  }
})
setTimeout(() => (this.productMessage = undefined), 2000);
}

list(){
  this.product.productList().subscribe((result)=>{
    console.warn(result)
    this.productList=result;
  })
}

}
