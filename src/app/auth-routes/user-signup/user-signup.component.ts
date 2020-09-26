import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  

  alreadyRegistered: boolean;
  passwordsMatch: boolean;
  noPassword: boolean;
  noEmail: boolean;

  ngOnInit(): void {
  }


  signupUser() {
    const email = this.userService.loginForm.get('email').value;
    const password = this.userService.loginForm.get('password').value;
    const confirmPassword = this.userService.loginForm.get('confirmPassword').value;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    if(password == null || confirmPassword == null) {
      this.noPassword = true
      setTimeout( () => {
        this.noPassword = false
      }, 4500)

    }
    else if(email == null) {
      this.noEmail = true
      setTimeout( () => {
        this.noEmail = false
      }, 4500)

    }
    else {

    
    this.userService.loginUsers(formData).subscribe(
      user => {
        console.log(user.ALREADY_IN, user.NO_MATCH);
        if(user.ALREADY_IN) {
          this.alreadyRegistered = true
          setTimeout( () => {
            this.alreadyRegistered = false
          }, 4500)
          this.userService.loginForm.get('password').reset();
          this.userService.loginForm.get('confirmPassword').reset();
          
        }

        else if (user.NO_MATCH){
          this.passwordsMatch = true
          setTimeout( () => {
            this.passwordsMatch = false
          }, 4500)
          this.userService.loginForm.get('password').reset();
          this.userService.loginForm.get('confirmPassword').reset();
          

        }
        else
        {
          console.log('usuario creado')
          this.userService.loginForm.reset();
        }
      }
    )

    
  }
}


}
