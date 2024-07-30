import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { isAuthenticated } from './utils/isAuthenticated';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isAuthenticated],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
