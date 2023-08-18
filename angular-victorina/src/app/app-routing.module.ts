import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './browse/browse.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CreateComponent } from './create/create.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { VictorinaComponent } from './victorina/victorina.component';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-question/:quizId',
    component: CreateQuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'victorina/:quizId',
    component: VictorinaComponent,
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
