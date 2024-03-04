import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
menuType : string= 'default';
sellerName : string= '';
  constructor( private route: Router) {}

  ngOnInit(): void {
      this.route.events.subscribe((val:any)=>{
        if (val.url){
          if(localStorage.getItem('seller') && val.url.includes('seller')){
            console.warn('is seller area')
            this.menuType='seller'
            if(localStorage.getItem('seller')){
              let sellerStore =localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName= sellerData.name;

            }
          }
          else{
            console.warn('outside sellelr')
            this.menuType='default'
          }
        }
      })
  }

  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
}
