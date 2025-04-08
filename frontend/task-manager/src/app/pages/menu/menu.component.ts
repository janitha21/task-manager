import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [CommonModule,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit  {
  userName: string | null = null;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.setName();  // Call the method to set the userName
  }

  setName(){
    this.userName = localStorage.getItem('userName');
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // or 'userId' or any key you store on login
  }
  logout() {
    localStorage.clear();  
    this.router.navigate(['/log']);  
  }
  isTasksRoute(): boolean {
    return this.router.url === '/tasks';
  }
  

}
