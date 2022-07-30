import { ContactComponent } from './components/dashboard/contact/contact.component';
import { AboutComponent } from './components/dashboard/about/about.component';
import { NewsDataComponent } from './components/news-data/news-data.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/dashboard/home/home.component';

const routes: Routes = [
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  // child routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component:AboutComponent
      },
      {
        path: 'contact',
        component:ContactComponent
      },
    ]
  },
  {
    path: 'news-data',
    component: NewsDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
