import { Component, OnInit } from '@angular/core';
import { userLogin, userSignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean=true;
  authError: string="";
constructor(private user:UserService){}
ngOnInit(): void {
    this.user.userAuthReload();
}
signUp(data:userSignUp){
  console.warn(data)
  this.user.userSignUp(data)

}
Login(data:userLogin){
  console.warn(data);
  this.user.userLogin(data)
  this.user.invalidUserAuth.subscribe((result)=>{
    console.warn('apple',result)
    if(result){
      this.authError="Please enter valid user detail"
    }
  })
}

openSignUp(){
this.showLogin=false;
}

openLogin(){
this.showLogin=true;
}
}
