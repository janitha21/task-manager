import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { response } from 'express';

declare const bootstrap: any;

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  @ViewChild('toastRef') toastRef!: ElementRef;

  toastMessage = '';
  toastClass = 'bg-success';

  constructor(private router: Router, private http: HttpClient) { }
  public loginError: string = '';


  user = {
    userName: '',

    password: ''
  };

  confirmPassword = '';

  signUp() {
    console.log("button work");

    if (!this.user.userName || !this.user.password) {
      this.loginError = 'Please enter both email and password.';
      return;
    }


    if (this.user.password !== this.confirmPassword) {
      this.loginError = 'Please enter both email and password.';
      this.showToast('pasword not matching', 'bg-danger');
      return;

    }

    this.http.post('http://localhost:8080/user/sign', this.user, { observe: 'response' }).subscribe(
      (response) => {
        console.log(response);

        if (response.status === 200) {
          this.showToast('Signed up successfully!', 'bg-success');
          console.log("success");

        }
      },
      (error) => {
        if (error.status === 401) {
          this.showToast('User Name exists... try another.', 'bg-danger');
        } else {
          this.showToast('Something went wrong. Try again.', 'bg-danger');
        }
      }
    );
  }

  showToast(message: string, cssClass: string) {
    this.toastMessage = message;
    this.toastClass = cssClass;

    const toastElement = this.toastRef.nativeElement;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }

  hideToast() {
    const toastElement = this.toastRef.nativeElement;
    const toast = bootstrap.Toast.getInstance(toastElement);
    toast.hide();
  }

  navigateToLogin() {
    this.router.navigate(['/log']);
  }

}
