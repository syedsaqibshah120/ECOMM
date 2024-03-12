import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http:HttpClient) { }

  addProduct(data: product){
    console.warn("services Call")
    return this.http.post('http://localhost:3000/products',data,{observe:'response'})

  }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/products')
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`,)
  }
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`,)
  }
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
  }
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
  }
  treandyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=30')
  }
  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAttToCart(data:product){
    let cartData=[];
    let localCart=localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productId:string){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:product[]= JSON.parse(cartData);
      items = items.filter((item:product)=> productId!== item.id)
     console.warn(items);
     localStorage.setItem('localCart', JSON.stringify(items));
     this.cartData.emit(items);
    }
  }
} 
