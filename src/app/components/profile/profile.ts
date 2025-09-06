// src/app/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  getUserInitial(): string {
    return this.currentUser?.username?.charAt(0).toUpperCase() || 'U';
  }

  getDisplayName(): string {
    if (this.currentUser?.firstName && this.currentUser?.lastName) {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }
    return this.currentUser?.username || 'Unknown User';
  }

  getDisplayEmail(): string {
    return this.currentUser?.email || 'No email provided';
  }

  getDisplayId(): string {
    return this.currentUser?.id?.toString() || 'N/A';
  }

  getProviderDisplay(): string {
    const provider = this.currentUser?.provider;
    if (!provider || provider === 'local') return 'Email/Password';
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  }
}
