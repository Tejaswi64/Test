
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  imports: [CommonModule]
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.userService.getAllUsers();
  }

  viewUserInfo(user: any): void {
    this.router.navigate(['/user-info'], { queryParams: { id: user.id } });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}

