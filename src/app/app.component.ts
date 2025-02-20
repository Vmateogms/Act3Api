import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ViewListComponent } from "./pages/view-list/view-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'act3ApiRestVicenteMateo';
}
