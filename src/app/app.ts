import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent,WelcomeComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'S6';
}
