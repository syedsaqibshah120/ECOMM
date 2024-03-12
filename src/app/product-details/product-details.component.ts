import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productQuantity:number=1
  quantity:number=1;
productData:undefined| product;
removeCart= false;
  constructor( private activeroute: ActivatedRoute, private product: ProductService){}

  ngOnInit(): void {
      let productId=this.activeroute.snapshot.paramMap.get('productId')
      console.warn(productId)
      productId && this.product.getProduct(productId).subscribe((result)=>{
        console.warn(result)
        this.productData=result
        let cartData= localStorage.getItem('localCart');
        if(productId && cartData){
          let items= JSON.parse(cartData);
          items = items.filter((item:product)=>productId==item.id.toString())
          if(items.length){
            this.removeCart=true
          }else{
            this.removeCart=false
          }
        }
      })
  }

  handelQuantity(val:string){
if(this.productQuantity<10 &&  val ==='plus'){
  this.productQuantity+=1
}else if(this.productQuantity>1 && val ==='min'){
  this.productQuantity-=1
}
}

addToCart(){
  if(this.productData){
    this.productData.quantity= this.productQuantity;
   if(!localStorage.getItem('user')){
    console.warn(this.productData);
    this.product.localAttToCart(this.productData);
    this.removeCart=true
   }
  }
}
removeToCart(productId:string){
  this.product.removeItemFromCart(productId)
  this.removeCart=false

}

}
