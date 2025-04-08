import { Component, OnInit } from '@angular/core';
import { TaskComponent } from '../../task/task.component';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface JwtPayload {
  userId: number;
  exp: number;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NgForOf, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  tasks: any[] = [];
  newTask = {
    title: '',
    description: '',
    status: 'todo',
    createdAt: ''
  };

  isFormVisible = false;
  public userId: number | null = null;

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        this.userId = decodedToken.userId;
        

        this.fetchTasks(token); // Fetch tasks after decoding token
      } catch (err) {
        console.error('Invalid token:', err);
        this.router.navigate(['/login']); // Redirect to login if token is invalid
      }
    } else {
      console.warn('No token found. Redirect to login.');
      this.router.navigate(['/login']); // Redirect to login if no token exists
    }
  }

  fetchTasksFromChild(){
      const token=localStorage.getItem("authToken")
      if (token) {
        this.fetchTasks(token);
      }
  }

  fetchTasks(token: string) {
    // Use HttpClient for making the request
    this.http.get<any[]>(`http://localhost:8080/task/get-all?userId=${this.userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Secure the request with JWT token
        'Content-Type': 'application/json'
      }
    })
    .subscribe(
      (data) => {
        this.tasks = data;
        
      },
      (err) => {
        console.error('Error fetching tasks:', err);
        // Handle token expiration or invalid session here
        if (err.status === 401) {
          this.router.navigate(['/login']); // Redirect to login if unauthorized
        }
      }
    );
  }

  // Filter tasks by status
  getTasksByStatus(status: string) {
    return this.tasks.filter(task => task.status === status);
  }

  // Show or hide the form to create a new task
  tabNewTask() {
    this.showNewTaskForm();
  }

  showNewTaskForm() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.newTask = {
        title: '',
        description: '',
        status: 'todo',
        createdAt: ''
      };
    }
  }

  submit() {
    console.log('Submitted task:', this.newTask);

    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (token && userId) {
      

      const now = new Date();
      this.newTask.createdAt = now.toISOString();
      // Send the task to backend securely with JWT
      this.http.post(`http://localhost:8080/task/create?userId=${userId}`, this.newTask, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .subscribe(
        (response) => {
          console.log('Task created successfully:', response);
          this.showNewTaskForm(); 
          this.fetchTasks(token); //refetch
        },
        (error) => {
          console.error('Error occurred while creating task:', error);
          // Handle errors here (e.g., invalid token, unauthorized)
        }
      );
    } else {
      console.error('Token or User ID not found.');
    }
  }
}
