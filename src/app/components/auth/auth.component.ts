import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';

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

  alertMessage = '';
  alertType = '';
  isLoading = false;

  async onLogin() {
    this.isLoading = true;
    this.clearAlert();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const storedUser = localStorage.getItem(this.loginEmail);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        'secret_key'
      ).toString(CryptoJS.enc.Utf8);
      if (this.loginPassword === decryptedPassword) {
        this.alertMessage = 'Login successful';
        this.alertType = 'success';
      } else {
        this.alertMessage = 'Invalid password';
        this.alertType = 'danger';
      }
    } else {
      this.alertMessage = 'User not found';
      this.alertType = 'danger';
    }

    this.isLoading = false;
  }

  async onSignup() {
    this.isLoading = true;
    this.clearAlert();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const encryptedPassword = CryptoJS.AES.encrypt(
      this.signupPassword,
      'secret_key'
    ).toString();
    const storedUser = localStorage.getItem(this.signupEmail);
    if (storedUser) {
      this.alertMessage = 'User already exists';
      this.alertType = 'danger';
    } else {
      localStorage.setItem(
        this.signupEmail,
        JSON.stringify({ password: encryptedPassword })
      );
      this.alertMessage = 'Signup successful';
      this.alertType = 'success';
    }
    this.isLoading = false;
  }

  clearAlert() {
    this.alertMessage = '';
    this.alertType = '';
  }
}
