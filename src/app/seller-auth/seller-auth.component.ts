import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { userSignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})

export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService, private router:Router){}
  showLogin =false

ngOnInit(): void {
  this.seller.reloadSeller() 
}


  signUp(data: userSignUp):void{
     // console.log(result);
    this.seller.userSignUp(data)
 }
 login(data: userSignUp):void{
  // console.log(data);
  this.seller.userLogin(data)

}

 openlogin(){
  this.showLogin =true
 }

 openSignUp(){
  this.showLogin =false
 }
 

}
