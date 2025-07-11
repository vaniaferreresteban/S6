import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BudgetListComponent } from './components/budget-list/budget-list.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:form', component: BudgetListComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];
