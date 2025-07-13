import { Component } from '@angular/core';
import { HomeComponent } from './features/budgets/components/home/home.component';
import { WelcomeComponent } from './layout/welcome/welcome.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, WelcomeComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'S6';
}
