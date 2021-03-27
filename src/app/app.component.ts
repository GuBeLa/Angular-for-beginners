import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserInterface } from './types/user.interface';
import { UsersService } from './services/users.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: UserInterface[] = []

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users: UserInterface[]) => {
      this.users = users
    })
  }

  // removeUser from parent
  removeUser(id: string): void {
    this.usersService.removeUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id)
    })
  }

  // addUser from parent
  addUser(name: string): void {
    this.usersService.addUser(name).subscribe(newUser => {
      this.users.push(newUser)
    })
  }
}
