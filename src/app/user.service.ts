
/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { id: 1, name: 'Alice Parker', email: 'alice@wb.com', password: 'alice123', role: 'admin', position: 'HR', phone: '123-456-7890', address: '123 Admin St.', payrate: '50$/hour' },
    { id: 2, name: 'John Doe', email: 'john@wb.com', password: 'john123', role: 'user', position: 'Web Developer', phone: '234-567-8901', address: '234 User Rd.', payrate: '45$/hour' },
    { id: 3, name: 'William Smith', email: 'william@wb.com', password: 'william123', role: 'user', position: 'Java Developer',phone: '345-678-9012', address: '345 User Ave.', payrate: '40$/hour' }
  ];

  private currentUser: any = null;

  authenticate(email: string, password: string): any {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      this.currentUser = user;
      return this.currentUser;
    }
    return null; 
  }

  setUser(user: any) {
    this.currentUser = user;
  }

  getUserInfo() {
    return this.currentUser;
  }

  getUserRole() {
    return this.currentUser?.role;
  }

  // Method to get all users excluding admin
  getAllUsers() {
    return this.users.filter(user => user.role !== 'admin');
  }

  // Method to update user information
  updateUserInfo(updatedInfo: any) {
    const index = this.users.findIndex(user => user.id === this.currentUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedInfo };
    }
  }
  getNextUserId(): number {
    return this.users.length ? Math.max(...this.users.map(user => user.id)) + 1 : 1; 
  }

  // Method to check if a user exists by email
  getUserByEmail(email: string): any {
    return this.users.find(user => user.email === email) || null; // Return user if exists, otherwise null
  }

  // Method to add a new user
  addUser(newUser: any) {
    const userId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1; // Generate new user ID
    this.users.push({ id: userId, ...newUser }); // Add new user with generated ID
  }
}
*/


import { Injectable } from '@angular/core';
import { User } from './user.model';
/*
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  position: string;
  phone: string;
  address: string;
  payRate: number;
}
*/
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice Parker', email: 'alice@wb.com', password: 'alice123', role: 'admin', position: 'HR', phone: '123-456-7890', address: '123 Admin St.', payRate: 500000 },
    { id: 2, name: 'John Doe', email: 'john@wb.com', password: 'john123', role: 'user', position: 'Web Developer', phone: '234-567-8901', address: '234 User Rd.', payRate: 450000 },
    { id: 3, name: 'William Smith', email: 'william@wb.com', password: 'william123', role: 'user', position: 'Java Developer',phone: '345-678-9012', address: '345 User Ave.', payRate: 40000 }
  ];

  private currentUser: User | null = null; // Specify User type for currentUser

  authenticate(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return user;
    }
    return null; // Return null if authentication fails
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id); // Return undefined if user not found
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email); // Find user by email
  }

  addUser(user: User): boolean {
    // Add user only if the email is unique
    if (this.users.find(u => u.email === user.email)) {
      return false; // Return false if email already exists
    }
    this.users.push(user);
    return true; // Return true on successful addition
  }

  updateUserInfo(updatedUser: User): void {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser; // Update user details
    }
  }

  getAllUsers(): User[] {
    return this.users; // Return the list of users
  }

  getNextUserId(): number {
    return this.users.length ? Math.max(...this.users.map(user => user.id)) + 1 : 1; 
  }

  updatePassword(newPassword: string): void {
    if (this.currentUser) {
      this.currentUser.password = newPassword; // Update password for the current user
    }
  }

  getUserInfo(): User | null {
    return this.currentUser; // Return the currently logged-in user
  }

  getUserRole(): string {
    return this.currentUser ? this.currentUser.role : ''; // Return the user's role or an empty string
  }

  setUser(user: User): void {
    this.currentUser = user; // Set the current user
  }
}
