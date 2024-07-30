import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true,
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginEmail = '';
  loginPassword = '';
  signupEmail = '';
  signupPassword = '';
  signupName = '';

  alertMessage = '';
  alertType = '';
  isLoading = false;

  constructor(private router: Router) {}

  async onLogin() {
    this.isLoading = true;
    this.clearAlert();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.loginEmail);

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        this.loginPassword,
        user.password
      );
      if (isPasswordMatch) {
        this.setAlertStatus('Login successful', 'success');
        this.router.navigate(['/dashboard']);
      } else {
        this.setAlertStatus('Invalid password', 'danger');
      }
    } else {
      this.setAlertStatus('User not found', 'danger');
    }

    this.loginEmail = '';
    this.loginPassword = '';
    this.isLoading = false;
  }

  async onSignup() {
    this.isLoading = true;
    this.clearAlert();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: any) => u.email === this.signupEmail);

    if (userExists) {
      this.setAlertStatus('User already exists', 'danger');
    } else {
      const hashedPassword = await bcrypt.hash(this.signupPassword, 10);
      users.push({
        email: this.signupEmail,
        name: this.signupName,
        password: hashedPassword,
      });
      localStorage.setItem('users', JSON.stringify(users));

      this.setAlertStatus('Signup successful', 'success');
    }

    this.signupEmail = '';
    this.signupName = '';
    this.signupPassword = '';
    this.isLoading = false;
  }

  setAlertStatus(alertMessage: string, alertType: string) {
    this.alertMessage = alertMessage;
    this.alertType = alertType;
  }

  clearAlert() {
    this.alertMessage = '';
    this.alertType = '';
  }
}
