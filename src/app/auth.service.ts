import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Set User Secure Token
  setUserId(userId) {
    localStorage.setItem('UserId', userId);
  }

  // Set User Secure Token
  getUserId() {
    return localStorage.getItem('UserId');
  }

  // Check User is LoggedIn or not!
  isLoggednIn() {
    return (this.getUserId() !== '0');
  }

  // Logout method
  logout() {
    localStorage.removeItem('UserId');
    this.router.navigate(['login']);
  }
}
