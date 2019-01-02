import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./front/login/login.component";
import { FeaturesComponent } from './front/features/features.component';
import { AssignmentComponent } from './front/assignment/assignment.component';
import { NavComponent } from './front/nav/nav.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: FeaturesComponent},
  {path: 'register', component: LoginComponent},
  {path:'assignment', component: AssignmentComponent},
  {path: 'nav', component: NavComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
