import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { tap } from "rxjs/operators";
import { Router, RouterEvent } from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  incorrectPassword: boolean  
  loggedIn: boolean
  noPassword: boolean
  noEmail: boolean 
  notFound: boolean
  isAuthenticated: boolean = false




  loginUser(){
    const email = this.userService.loginForm.get('email').value;
    const password = this.userService.loginForm.get('password').value;
    if(password === null) {
      this.noPassword = true
      setTimeout( () => {
        this.noPassword = false
      })

      return
    }
    else if(email === null) {
      this.noEmail = true
      setTimeout( () => {
        this.noEmail = false
      }, 4500)

      return
    }
    
    else {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      this.userService.loginUsers(formData).subscribe(
        user => {
          if(user.NOT_FOUND){
  
            this.notFound = true
            setTimeout( () => {
              this.notFound = false
            }, 4500)
            return 
  
          }
          else if(user.WRONG_PASS) {  
            this.incorrectPassword = true
  
            setTimeout( () => {
              this.incorrectPassword = false
            }, 4500)

            this.isAuthenticated = false

            return this.isAuthenticated
  
            
  
          }
          else if(user.LOGGED_IN){
            console.log('user logged in');
            this.isAuthenticated = true;

            this.router.navigateByUrl('/dashboard');
            


            return this.isAuthenticated
            
          }

        
         
        })

      
    }
 
  

    
  }

}
