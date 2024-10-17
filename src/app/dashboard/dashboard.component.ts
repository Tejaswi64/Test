




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service'; // Import UserService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';
//import { User } from './user.model';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  isModalOpen = false; // For Change Password modal
  isAddEmployeeModalOpen = false; // For Add Employee modal
  currentPassword: string = ''; // For current password input
  newPassword: string = ''; // For new password input
  newEmployee: any = { name: '', email: '', password: '', position: '' }; // For new employee input
  changePasswordError: string | null = null;
  changePasswordSuccess: string | null = null;
  addEmployeeError: string | null = null; // Error message for add employee
  addEmployeeSuccess: string | null = null; // Success message for add employee

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  get isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  viewUserInfo(): void {
    this.router.navigate(['/user-info']);
  }

  viewAllUsers(): void {
    this.router.navigate(['/all-users']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openChangePasswordModal(): void {
    this.isModalOpen = true;
    this.changePasswordError = null;
    this.changePasswordSuccess = null;
  }

  closeChangePasswordModal(): void {
    this.isModalOpen = false;
    this.currentPassword = '';
    this.newPassword = '';
  }

  onChangePassword(): void {
    if (this.authService.getCurrentUser()?.password === this.currentPassword) {
      this.authService.updatePassword(this.newPassword);
      this.changePasswordSuccess = 'Password changed successfully!';
      this.changePasswordError = null;
      this.closeChangePasswordModal();
    } else {
      this.changePasswordError = 'Current password is incorrect.';
      this.changePasswordSuccess = null;
    }
  }

  openAddEmployeeModal(): void {
    this.isAddEmployeeModalOpen = true;
    this.addEmployeeError = null;
    this.addEmployeeSuccess = null;
    this.newEmployee = { name: '', email: '', password: '', position: '' }; // Reset form
  }

  closeAddEmployeeModal(): void {
    this.isAddEmployeeModalOpen = false;
  }

  onAddEmployee(): void {
    const { name, email, password, position, phone, address, payRate  } = this.newEmployee;
    
    // Validate the new employee details (you can add more validation as needed)
    if (!name || !email || !password || !position || !phone || !address || payRate === null) {
      this.addEmployeeError = 'All fields are required.';
      return;
    }
    const newUser: User = {
      id: this.userService.getNextUserId(), // Get the next user ID
      name: name,
      email: email,
      password: password,
      role: 'user', // Default role
      position: position,
      phone: phone,
      address: address,
      payRate: payRate,
    };

    // Assuming userService has an addUser method to add a new employee
    const addedSuccessfully = this.userService.addUser(newUser );

    if (addedSuccessfully) {
      this.addEmployeeSuccess = 'Employee added successfully!';
      this.addEmployeeError = null;
      this.closeAddEmployeeModal();
    } else {
      this.addEmployeeError = 'Failed to add employee. Please try again.';
      this.addEmployeeSuccess = null;
    }
  }
}

