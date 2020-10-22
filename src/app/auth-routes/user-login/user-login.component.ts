import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { tap, map } from "rxjs/operators";
import { Router, RouterEvent } from "@angular/router";


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

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



  ngOnInit(): void {

    this.checkLoggedIn();

    


  }


  

  checkLoggedIn(){
    this.userService.getUsers().subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log('this error ocurred', error)
      },
      () => {console.log('completed successfully')}
    )


    // this.userService.checkSession().subscribe(
    //   res => {
    //     if(res.LOGGED_IN){
    //       console.log('you are logged in')
    //       this.userService.isAuthenticated = true
    //       this.router.navigateByUrl('/dashboard');
    //     }
    //     else {
    //       console.log('you are not logged in')
    //       this.userService.isAuthenticated = false
    //     }
    //   },
    //   error => {
    //     console.log(error)
    //   },
    //   () => {console.log('request completed')}

    // )

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
            this.isAuthenticated = true;

            this.router.navigateByUrl('/dashboard');

            return this.isAuthenticated
          
            
          }

        
         
        })

      
    }
 
  

    
  }

}
