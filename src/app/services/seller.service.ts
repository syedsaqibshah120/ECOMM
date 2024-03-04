import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userLogin, userSignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from 'stream';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  
isSellerLoggedIn= new BehaviorSubject<boolean>(false);

isLoginError = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient, private router: Router) { }

  userSignUp(data:userSignUp){
    console.warn("services Call")
     this.http.post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((result)=>{
     this.isSellerLoggedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body))
    this.router.navigate(['seller-home']);
    console.log('result',result)
    });
   }

   reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
   }


   userLogin(data: userLogin) {
    // console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' })
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body.length) {
          console.warn("Login successful");
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.log("Login failed");
          this.isLoginError.next(true);
          alert("Wrong email and/or password. Please try again.");
        }
      });
  }
  

}
