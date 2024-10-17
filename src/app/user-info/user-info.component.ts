import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UserInfoComponent implements OnInit {
  currentUser: any = null;
  editedUserInfo: any;
  isEditing: boolean = false;
  isAdmin: boolean = false; // Track if the logged-in user is an admin
  loggedInUserId: number | null = null; // Track the logged-in user ID
  newSalary: number | null = null; // To hold the new salary input
  showSalaryDialog: boolean = false; // Controls visibility of the salary dialog

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Determine if the logged-in user is an admin
    this.isAdmin = this.authService.getUserRole() === 'admin'; 

    // Get the 'id' query parameter
    const userId = this.route.snapshot.queryParamMap.get('id');

    if (userId) { // If 'id' is present, fetch the specific user's info
      const id = +userId; // Convert to number
      this.currentUser = this.userService.getAllUsers().find(user => user.id === id);
      if (!this.currentUser) {
        // If no user found with the given ID, navigate back to dashboard or show an error
        console.error('User not found');
        this.router.navigate(['/dashboard']);
      }
      this.editedUserInfo = { ...this.currentUser }; // Initialize edited info with user info
      this.newSalary = this.currentUser.payRate; // Set the current salary for editing
    } else { // If 'id' is not present, assume it's the current user's info
      this.currentUser = this.authService.getCurrentUser();
      this.editedUserInfo = { ...this.currentUser };
      this.newSalary = this.currentUser.payRate; // Set the current salary for editing
    }

    // Get the logged-in user's ID for editing permissions
    this.loggedInUserId = this.authService.getCurrentUser()?.id ?? null;
  }

  editUserInfo() {
    // Allow editing only if the logged-in user is the same as current user
    if (this.isAdmin && this.loggedInUserId === this.currentUser?.id) {
      this.isEditing = true; 
    } else if (!this.isAdmin) {
      this.isEditing = true; // Allow normal users to edit their own info
    }
  }

  saveUserInfo() {
    // Allow saving only if the logged-in user is the same as current user
    if ((this.isAdmin && this.loggedInUserId === this.currentUser?.id) || !this.isAdmin) {
      this.userService.updateUserInfo(this.editedUserInfo);
      this.isEditing = false; 
      this.currentUser = { ...this.editedUserInfo }; 
    }
  }

  openSalaryDialog() {
    this.newSalary = this.currentUser.payRate; // Pre-fill with current salary
    this.showSalaryDialog = true; // Show the dialog
  }

  closeSalaryDialog() {
    this.showSalaryDialog = false; // Hide the dialog
    this.newSalary = null; // Clear the new salary input
  }

  confirmSalaryChange() {
    if (this.isAdmin && this.currentUser && this.newSalary !== null) {
      this.currentUser.payRate = this.newSalary; // Update the salary
      this.userService.updateUserInfo(this.currentUser); // Call service to update user
      alert(`Salary for ${this.currentUser.name} updated to ${this.newSalary}`); // Alert success
      this.closeSalaryDialog(); // Close the dialog
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);  // Navigate back to the dashboard
  }
}
