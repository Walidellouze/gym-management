import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Api2Service } from '../service/api2.service';
import { ImageService } from '../service/image.service';
import { Observable } from 'rxjs';
import { Coach } from '../models/register2.model';

@Component({
  selector: 'app-create-registration-coach',
  templateUrl: './create-registration-coach.component.html',
  styleUrls: ['./create-registration-coach.component.scss']
})
export class CreateRegistrationCoachComponent implements OnInit {
  imageUrl: string = '';
  selectedGender!: string;
  genders: string[] = ["Male", "Female"];
  packages: string[] = ["Strength and conditioning" ," Endurance training" ,   "Weight loss and management","Injury rehabilitation and prevention",
  "Flexibility and mobility training",
  "Nutrition and diet coaching",
  "Sports-specific training (e.g. soccer, basketball, tennis)",
  "Functional training",
  "Yoga and Pilates coaching",
  "Group fitness instruction"];
  
  registrationFormcoach!: FormGroup;
  private coachIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  oldValues: Coach | undefined;

  constructor(
    private fb: FormBuilder, 
    private api2: Api2Service, 
    private toastService: NgToastService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router , 
    private imageService: ImageService
  ) {}

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.imageService.saveImage(this.imageUrl, file.name).subscribe({
        next: (res: any) => {
          console.log(res);
          // Stocker l'URL de l'image dans registrationForm et Coach
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    };
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.registrationFormcoach = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      mobile: [''],
      package: [''],
      profilePicture: [''],
    });
   
    this.activatedRoute.params.subscribe(val => {
      this.coachIdToUpdate = val['id'];
      if (this.coachIdToUpdate) {
        this.isUpdateActive = true;
        this.api2.getRegisteredCoachId(this.coachIdToUpdate).subscribe({
          next: (res) => {
            this.oldValues = res;
            this.fillFormToUpdate(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  submit() {
    if (this.registrationFormcoach.valid) {
      this.api2.postRegistration(this.registrationFormcoach.value).subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.registrationFormcoach.reset();
        this.router.navigate(['/list-coach']);
      });
    } else {
      this.toastService.error({ detail: 'Please fill in all required fields', summary: 'Error', duration: 3000 });
    }
  }

  fillFormToUpdate(coach: Coach) {
    const formValues = {
      firstName: coach.firstName || '',
      lastName: coach.lastName || '',
      email: coach.email || '',
      mobile: coach.mobile || '',
      package: coach.package || '',
      profilePicture: coach.profilePicture || '',
    };

    this.registrationFormcoach.setValue(formValues);
  }

  update() {
    const formValues = this.registrationFormcoach.value;

    if (this.oldValues) {
      formValues.firstName = formValues.firstName || this.oldValues.firstName;
      formValues.lastName = formValues.lastName || this.oldValues.lastName;
      formValues.email = formValues.email || this.oldValues.email;
      formValues.mobile = formValues.mobile || this.oldValues.mobile;
      formValues.package = formValues.package || this.oldValues.package;
      formValues.profilePicture = formValues.profilePicture || this.oldValues.profilePicture;
    }

    this.api2.updateRegisterCoach(formValues, this.coachIdToUpdate).subscribe(() => {
      this.toastService.success({ detail: 'SUCCESS', summary: 'Coach Details Updated Successful', duration: 3000 });
      this.router.navigate(['list']);
      this.registrationFormcoach.reset();
    });
  }

 
}
