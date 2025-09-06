// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SignupData } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
})
export class SignupComponent {
  signupData: SignupData = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  socialLoading = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    if (this.signupData.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.signup(this.signupData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = response.message || 'Account created successfully!';
          setTimeout(() => {
            this.router.navigate(['/planner']);
          }, 1500);
        } else {
          this.errorMessage = response.message || 'Signup failed';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Signup failed. Please try again.';
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

  private validateForm(): boolean {
    if (!this.signupData.firstName.trim()) {
      this.errorMessage = 'First name is required';
      return false;
    }
    if (!this.signupData.lastName.trim()) {
      this.errorMessage = 'Last name is required';
      return false;
    }
    if (!this.signupData.username.trim()) {
      this.errorMessage = 'Username is required';
      return false;
    }
    if (!this.signupData.email.trim()) {
      this.errorMessage = 'Email is required';
      return false;
    }
    if (!this.isValidEmail(this.signupData.email)) {
      this.errorMessage = 'Please enter a valid email';
      return false;
    }
    if (!this.signupData.password) {
      this.errorMessage = 'Password is required';
      return false;
    }
    if (this.signupData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return false;
    }
    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
