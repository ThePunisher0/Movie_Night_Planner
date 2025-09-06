// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  socialLoading = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = 'Login successful!';
          setTimeout(() => {
            this.router.navigate(['/planner']);
          }, 1000);
        } else {
          this.errorMessage = response.message || 'Invalid username or password';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please try again.';
      },
    });
  }

  onSocialLogin(provider: 'google' | 'facebook' | 'twitter'): void {
    this.socialLoading = provider;
    this.errorMessage = '';

    this.authService.socialLogin(provider).subscribe({
      next: (response) => {
        this.socialLoading = '';
        if (response.success) {
          this.successMessage = response.message || `Logged in with ${provider}!`;
          setTimeout(() => {
            this.router.navigate(['/planner']);
          }, 1500);
        } else {
          this.errorMessage = response.message || `${provider} login failed`;
        }
      },
      error: () => {
        this.socialLoading = '';
        this.errorMessage = `${provider} login failed. Please try again.`;
      },
    });
  }
}
