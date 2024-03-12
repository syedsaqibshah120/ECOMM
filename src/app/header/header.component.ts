import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ faSearch} from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchIcon= faSearch;
menuType : string= 'default';
sellerName : string= '';
userName : string='';
 cartItems=0;
  constructor( private route: Router, private product:ProductService) {}

  ngOnInit(): void {
      this.route.events.subscribe((val:any)=>{
        if (val.url){
          if(localStorage.getItem('seller') && val.url.includes('seller')){
            this.menuType='seller'
            if(localStorage.getItem('seller')){
              let sellerStore =localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName= sellerData.name;
            }
          }
          else if(localStorage.getItem('user')){
            if(localStorage.getItem('user')){
              let userStore =localStorage.getItem('user');
              let userData = userStore && JSON.parse(userStore)[0];
              this.userName= userData.name;
              this.menuType='user'
            }
          }
          else{
            this.menuType='default'
          }
        }
      });
      let cartData = localStorage.getItem('localCart');
      if(cartData){
        this.cartItems=JSON.parse(cartData).length
      }

 
this.product.cartData.subscribe((items) => {
  this.cartItems = items.length;
});

  }

  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogOut(){
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
  }
  
}
