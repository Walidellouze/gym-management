import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { NgConfirmModule } from 'ng-confirm-box';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { CreateRegistrationCoachComponent } from './create-registration-coach/create-registration-coach.component';
import { RegistrationListCoachComponent } from './registration-list-coach/registration-list-coach.component';
import { CoachDetailComponent } from './coach-detail/coach-detail.component';
import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TemplateComponent } from './template/template.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { emploi } from './models/emploi';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgChartsModule } from 'ng2-charts';
import { FootComponent } from './foot/foot.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationListComponent,
    CreateRegistrationComponent,
    UserDetailComponent,
    CreateRegistrationCoachComponent,
    RegistrationListCoachComponent,
    CoachDetailComponent,
    EmploiDuTempsComponent,
    LoginComponent,
    SignupComponent,
    TemplateComponent,
    DashboardComponent,
    FootComponent,
    HomeComponent,

    
    
    


   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatSlideToggleModule,
    NgToastModule,
    NgConfirmModule,
    MatFormFieldModule ,
    MatIconModule , 
    HttpClientModule,
    FormsModule,
    NgbModule,
    ToastrModule,
    MatSidenavModule,
    MatMenuModule,
    MatTreeModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
   
    RouterModule.forRoot([
      { path: '', component: emploi, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent }
    ])
  ],
  
  
  providers: [AuthService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
