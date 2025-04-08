import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './pages/home/home.component';
  

export const routes: Routes = [
     {
        path : "",
        component : HomeComponent,
       
    },
    {
        path : "tasks",
        component : TasksComponent,
        canActivate: [AuthGuard]
    },
    {
        path : "log",
        component : LoginComponent
    },
    {
        path : "sign",
        component : SignupComponent
    }
];


