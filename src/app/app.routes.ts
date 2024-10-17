
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { SignupComponent } from './signup/signup.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { authGuard } from './auth.guard'; // Import the functional authGuard
import { ValidationsComponent } from './validations/validations.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'signup', component: SignupComponent }, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, // Protecting dashboard
  { path: 'reactive-form', component: ValidationsComponent, canActivate: [authGuard] },
  { path: 'user-info', component: UserInfoComponent, canActivate: [authGuard] },  // Protecting user-info
  { path: 'all-users', component: AllUsersComponent, canActivate: [authGuard] }   // Protecting all-users
];
