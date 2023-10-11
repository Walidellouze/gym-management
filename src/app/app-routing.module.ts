import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreateRegistrationCoachComponent } from './create-registration-coach/create-registration-coach.component';
import { RegistrationListCoachComponent } from './registration-list-coach/registration-list-coach.component';
import { CoachDetailComponent } from './coach-detail/coach-detail.component';
import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './service/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';




const routes: Routes = [
  

  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'register-member', component: CreateRegistrationComponent  },
  { path: 'update-member/:id', component: CreateRegistrationComponent },
  { path: 'detail-member/:id', component: UserDetailComponent },
  { path: 'list-member', component: RegistrationListComponent }, //canActivate: [AuthGuardService] },
  { path: 'emploi', component: EmploiDuTempsComponent }, //canActivate: [AuthGuardService] },


  { path: 'register-coach', component: CreateRegistrationCoachComponent }, //canActivate: [AuthGuardService] },
  { path: 'update-coach/:id', component: CreateRegistrationCoachComponent },
  { path: 'detail-coach/:id', component: CoachDetailComponent },
  { path: 'list-coach', component: RegistrationListCoachComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },//canActivate: [AuthGuardService] },



  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
