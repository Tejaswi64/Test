import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule] // Add CommonModule here
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const isLoggedIn = this.authService.login(this.email, this.password);
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.loginFailed = true; // Show error message if login fails
    }
  }
}
