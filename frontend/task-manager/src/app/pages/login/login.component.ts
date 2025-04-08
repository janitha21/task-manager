import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common'; 




interface JwtPayload {
  userId: number; 
  exp: number;   
  userName: string;
}

@Component({
  selector: 'app-login',
  
  imports: [FormsModule,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {

  constructor(private router: Router,private http: HttpClient) {}

  credentials = {
    userName: '',
    password: '',
  };
  public loginError: string = ''; 

  public userId: number | null = null; 
  public userName: string='';

  login() {
    console.log("work");
    
   
     // Basic input validation
     if (!this.credentials.userName || !this.credentials.password) {
      this.loginError = 'Please enter both email and password.';
      return;
    }

    // Make a POST request to the login API
    this.http.post<{ token?: string, error?: string }>('http://localhost:8080/user/log-in', this.credentials)
      .subscribe(
        (response) => {
          console.log(response);

          
          // Check if the token is present in the response
          if (response.token) {
            
            localStorage.setItem('authToken', response.token);
           
            // Decode the token
            try {
              const decodedToken = jwtDecode<JwtPayload>(response.token);
              this.userId = decodedToken.userId; 
              this.userName= decodedToken.userName;

              localStorage.setItem('userId', decodedToken.userId.toString());
              localStorage.setItem('userName', decodedToken.userName);
              
            

              console.log(`User ID: ${this.userId}`);
              console.log(`User Name: ${this.userName}`);
              this.router.navigate(['/tasks']); 

             // localStorage.setItem('userId1', this.userId.toString());
            
              
              

            } catch (error) {
              console.error('Error decoding token:', error);
              this.loginError = 'Invalid credentials, please try again!';
            }
          } else if (response.error) {
            this.loginError = response.error;
          }
        },
        (error: HttpErrorResponse) => {
          // Check if the error contains a specific message from the backend
          if (error.error && error.error.error) {
            console.error('Login failedaaa:', error.error.error); // Log the specific error message
            this.loginError = error.error.error; // Display error message
            this.router.navigate(['/products']);
          } else {
            console.error('Login failedaaa:', error.message); // Log a generic error message
            this.loginError = 'Invalid credentials, please try again!';
            this.router.navigate(['/products']);
          }
        }
      );
  }

  navigateToSignUp() {
    this.router.navigate(['/sign']);  // Navigate to the '/signup' route
  }

}
