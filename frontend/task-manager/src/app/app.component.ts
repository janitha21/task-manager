import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule for routing
import { MenuComponent } from './pages/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Mark the component as standalone
  imports: [RouterModule,MenuComponent]  // Import RouterModule to use router-outlet
})
export class AppComponent {
  title = 'Your App Title';  // You can change the title here
}
