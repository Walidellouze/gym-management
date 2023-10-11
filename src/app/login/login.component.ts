import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  constructor(private AS:AuthService ,private AG:AuthGuardService,private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
 
  login(){
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      //matching email and password
    const user = res.find((a:any)=>{
      this.AS.login(a.email,a.password);
      return a.email === this.loginform.value.email && a.password === this.loginform.value.password
    })
    
    //condition check for login
    if(user){
    
      this.AG.canActivate();
      this.loginform.reset();
      this.router.navigate(['/home'])
     
    }else{
      alert("user not found with these credentials")
    }
    }
    ,err=>{
     alert("something went wrong");

    }
      )
    
      }




















}