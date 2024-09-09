import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {WelcomeComponent} from "./welcome/welcome.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    children: [],
  },
];
