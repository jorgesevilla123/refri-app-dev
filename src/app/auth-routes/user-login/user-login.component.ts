import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { tap, map } from "rxjs/operators";
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



  get email() {
    return this.userService.loginForm.get('email');
  }

  get password() {
    return this.userService.loginForm.get('password');
  }


  


  



  loginUser(){
    const email = this.userService.loginForm.get('email').value;
    const password = this.userService.loginForm.get('password').value;
    if(password === null) {
    
      return
    }
    else if(email === null) {
    
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
          if(user.NO_MATCH) {  
            this.incorrectPassword = true
            setTimeout( () => {
              this.incorrectPassword = false
            }, 4500)

            return
  
          }
           if(user.LOG_IN){
            console.log('user logged in');
            this.router.navigateByUrl('/dashboard');
          }

        
         
        })

      
    }
 
  

    
  }

}
