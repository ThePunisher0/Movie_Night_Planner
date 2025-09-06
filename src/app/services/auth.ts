// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  provider?: 'local' | 'google' | 'facebook' | 'twitter';
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@movieplanner.com',
      firstName: 'Admin',
      lastName: 'User',
      provider: 'local',
    },
  ];

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  login(username: string, password: string): Observable<{ success: boolean; message?: string }> {
    return new Observable((observer) => {
      setTimeout(() => {
        const user = this.users.find(
          (u) => (u.username === username || u.email === username) && password === 'password'
        );

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
          observer.next({ success: true });
        } else {
          observer.next({ success: false, message: 'Invalid credentials' });
        }
        observer.complete();
      }, 1000);
    });
  }

  signup(signupData: SignupData): Observable<{ success: boolean; message?: string }> {
    return new Observable((observer) => {
      setTimeout(() => {
        const existingUser = this.users.find(
          (u) => u.username === signupData.username || u.email === signupData.email
        );

        if (existingUser) {
          observer.next({
            success: false,
            message: 'Username or email already exists',
          });
        } else {
          const newUser: User = {
            id: this.users.length + 1,
            username: signupData.username,
            email: signupData.email,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            provider: 'local',
          };

          this.users.push(newUser);

          localStorage.setItem('currentUser', JSON.stringify(newUser));
          this.currentUserSubject.next(newUser);
          this.isLoggedInSubject.next(true);

          observer.next({ success: true, message: 'Account created successfully!' });
        }
        observer.complete();
      }, 1500);
    });
  }

  socialLogin(
    provider: 'google' | 'facebook' | 'twitter'
  ): Observable<{ success: boolean; message?: string }> {
    return new Observable((observer) => {
      setTimeout(() => {
        const socialUser: User = {
          id: this.users.length + 1,
          username: `${provider}_user_${Date.now()}`,
          email: `user@${provider}.com`,
          firstName: 'Social',
          lastName: 'User',
          provider: provider,
          profilePicture: `https://via.placeholder.com/100/667eea/FFFFFF?text=${provider[0].toUpperCase()}`,
        };

        this.users.push(socialUser);
        localStorage.setItem('currentUser', JSON.stringify(socialUser));
        this.currentUserSubject.next(socialUser);
        this.isLoggedInSubject.next(true);

        observer.next({ success: true, message: `Logged in with ${provider}!` });
        observer.complete();
      }, 2000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}
