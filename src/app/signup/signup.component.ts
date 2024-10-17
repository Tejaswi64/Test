
import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Make sure to import UserService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = ''; // New field for name
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = ''; // New field for phone
  address: string = ''; // New field for address
  position: string = '';
  payRate: number = 0; // New field for pay rate
  signupFailed: boolean = false; // Flag to indicate signup failure

  constructor(private userService: UserService) {}

  onSignup(): void {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.signupFailed = true; // Set flag for password mismatch
      return;
    }

    const newUser = {
      id: this.userService.getNextUserId(), // Method to get the next ID
      name: this.name,
      email: this.email,
      password: this.password,
      position: this.position,
      phone: this.phone,
      address: this.address,
      payRate: this.payRate,
      role: 'user' // Default role
    };

    // Call the service method to add the new user
   // const success = this.userService.addUser(newUser);

    if (!this.userService.addUser(newUser)) {
      this.signupFailed = true; // Set flag for failed signup
    } else {
      // Handle successful signup (e.g., redirect to a login page or show a success message)
      // Reset the form fields if needed
      this.resetForm();
    }
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.phone = '';
    this.address = '';
    this.payRate = 0;
    this.signupFailed = false;
  }
}


/*
import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Make sure to import UserService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = ''; // New field for name
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = ''; // New field for phone
  address: string = ''; // New field for address
  payRate: number | null = null; // New field for pay rate
  signupFailed: boolean = false; // Flag to indicate signup failure

  constructor(private userService: UserService) {}

  onSignup(): void {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.signupFailed = true; // Set flag for password mismatch
      return;
    }

    const newUser = {
      id: this.userService.getNextUserId(), // Method to get the next ID
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      payRate: this.payRate,
      role: 'user' // Default role
    };

    // Call the service method to add the new user
    if (!this.userService.addUser(newUser)) {
      this.signupFailed = true; // Set flag for failed signup
    } else {
      // Handle successful signup (e.g., redirect to a login page or show a success message)
      this.resetForm();
    }
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.phone = '';
    this.address = '';
    this.payRate = null;
    this.signupFailed = false;
  }
}
*/