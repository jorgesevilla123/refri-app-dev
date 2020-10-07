import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  

  alreadyRegistered: boolean;
  passwordsMatch: boolean;
  noPassword: boolean;
  noEmail: boolean;

  



  signupUser() {
    const email = this.userService.signupForm.get('email').value;
    const password = this.userService.signupForm.get('password').value;
    const confirmPassword = this.userService.signupForm.get('passwordConfirm').value;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', confirmPassword);
     if(email == null) {
      this.noEmail = true
      setTimeout( () => {
        this.noEmail = false
      }, 4500)

    }
    else if(password == null || confirmPassword == null) {
      this.noPassword = true
      setTimeout( () => {
        this.noPassword = false
      }, 4500)

    }

    else {

    
    this.userService.signUsers(formData).subscribe(
      user => {

        if(user.ALREADY_IN) {
          this.alreadyRegistered = true
          setTimeout( () => {
            this.alreadyRegistered = false
          }, 4500)
          this.userService.signupForm.get('password').reset();
          this.userService.signupForm.get('confirmPassword').reset();
          
        }

        else if (user.NO_MATCH){
          this.passwordsMatch = true
          setTimeout( () => {
            this.passwordsMatch = false
          }, 4500)
          this.userService.signupForm.get('password').reset();
          this.userService.signupForm.get('confirmPassword').reset();
          

        }
        else
        {
          console.log('usuario creado')
          this.userService.signupForm.reset();
          this.router.navigateByUrl('/dashboard');
        }
      }
    )

    
  }
}


}
