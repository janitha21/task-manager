import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']  // Note: styleUrls (plural) is correct
})
export class TaskComponent {
  constructor(private http: HttpClient, private router: Router) {}

  isFormVisible = false;
  createdAt='';

  updatedTask = {
    title: '',
    description: '',
    status: 'todo',
    createdAt: ''
  };

  @Input() task: any;
  @Output() taskUpdated = new EventEmitter<void>();

  // Show or hide the form for editing a task
  showNewTaskForm(task: any) {
    console.log(task);
    this.isFormVisible = !this.isFormVisible;

    if (this.isFormVisible) {
      this.updatedTask = {
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt
      };
    }
  }

  closeTaskFoam() {
    this.isFormVisible = false;
  }

  updateTask(event: Event, task: any) {
    event.preventDefault();
    console.log('Submitted task:', this.updatedTask);

    const token = localStorage.getItem('authToken');
    const taskId = this.task.taskId;

    if (token && taskId) {
      this.http.post(`http://localhost:8080/task/update?taskId=${taskId}`, this.updatedTask, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      })
      .subscribe({
        next: (response) => {
          console.log('Task updated successfully:', response);
          this.closeTaskFoam();
          this.taskUpdated.emit(); // Emit event to notify parent to refresh
        },
        error: (error) => {
          console.error('Error occurred while updating task:', error);
        }
      });
    } else {
      console.error('Token or Task ID not found.');
    }
  }

 //---------delete task--------------------

  deleteTask(task: any) {

    console.log("delete works");
    
    const token = localStorage.getItem('authToken');
    const taskId = this.task.taskId;

    if (token) {
      this.http.delete(`http://localhost:8080/task/delete/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'json',
      })
      .subscribe({
        next: (response) => {
          console.log('Task deleted successfully:', response);
          // You can emit an event to update the parent component or refresh the task list.
          this.taskUpdated.emit(); 
        },
        error: (error) => {
          console.error('Error occurred while deleting task:', error);
        }
      });
    } else {
      console.error('Token not found');
    }
  }


  //-----confirm delete--------
  confirmDelete(task: any) {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      this.deleteTask(task);
    }
  }

  //----show description----
  showDescription(task: any) {
    alert(task.description);
  }
  


}

