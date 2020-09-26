import { Component, OnInit } from '@angular/core';

import { UserService } from "../../services/user.service";

import { userInterface } from "../../interfaces-models/users";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  users: userInterface[]

  ngOnInit(): void {
  
  

  }

  geUsers() {
    this.userService.getUsers().subscribe(
      users => console.log(users)

    )

  }

}


