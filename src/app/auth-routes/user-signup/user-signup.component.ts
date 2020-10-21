import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  

  alreadyRegistered: boolean;
  passwordsMatch: boolean;
  noPassword: boolean;
  noEmail: boolean;
  validationError: boolean;
  invalidEmail: boolean;
  minLength: boolean;


  ngOnInit() {
    
  

  }


  get email() {
    return this.userService.signupForm.get('email');
  }



  get password() {
    return this.userService.signupForm.get('password');
  }



  signupUser() {
    const email = this.userService.signupForm.get('email').value;
    const password = this.userService.signupForm.get('password').value;
    const confirmPassword = this.userService.signupForm.get('passwordConfirm').value;
    console.log(this.userService.signupForm.errors)
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', confirmPassword);
     if(email == null) {
       return

    }
    else if(password == null || confirmPassword == null) {

      return
  
    }

    else {

    
    this.userService.signUsers(formData).subscribe(
      user => {

        
       if(user.ALREADY_IN) {
        this.alreadyRegistered = true
        setTimeout( () => {
          this.alreadyRegistered = false
        
        }, 4500)
        return
      }

      if(user.INVALID_EMAIL){
        this.invalidEmail = true
        setTimeout( () => {
          this.invalidEmail = false
        }, 3000)
        return
      }

      if(user.MIN_LENGTH){
        this.minLength = true
        setTimeout( () => {
          this.minLength = false

        }, 3000)
        return

      }

        if (user.NO_MATCH){
          this.passwordsMatch = true
          setTimeout( () => {
            this.passwordsMatch = false
          }, 4500)
          return

          

        }
        if(user.LOGGED_IN)
        {
          console.log('usuario creado')
          this.userService.signupForm.reset();
          this.router.navigateByUrl('/dashboard');
        }
    console.log(user);
  
      }
    )

    
  }
}


}
