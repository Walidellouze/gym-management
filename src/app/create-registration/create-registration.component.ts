import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../service/api.service';
import { Api2Service } from '../service/api2.service';
import { ImageService } from '../service/image.service';
import { User } from '../models/register.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  imageUrl: string = '';
  selectedGender!: string;
  genders: string[] = ["Male", "Female"];
  packages: string[] = ["Monthly", "Quarterly", "Yearly"];
  importantList: string[] = [
    "Bodybuilding",
    "Yoga classe",
    "Group fitness classe",
    "High-intensity interval training (HIIT) classe",
    "Dance-based classe",
    "Boot camp classe"
  ];
  coachnames: string[] = [];
  registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  oldValues: User | undefined;
  selectedRequireTrainer: string | undefined;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private api2: Api2Service,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      coachName: [''],
      package: [''],
      important: [[]],
      enquiryDate: [''],
      haveGymBefore: [''],
      profilePicture: [''],
      imageUrl: [''],
    });

    this.api2.getRegisteredCoach().subscribe((Coache) => {
      this.coachnames = Coache.map((coach) => coach.firstName);
    });

    this.registrationForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });

    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.api.getRegisteredUserId(this.userIdToUpdate)
          .subscribe({
            next: (res) => {
              this.oldValues = res;
              this.fillFormToUpdate(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
    })
  }

  submit() {
    if (this.registrationForm.valid) {
      if (this.selectedRequireTrainer === 'yes' && !this.registrationForm.value.coachName) {
        return;
      }

      this.api.postRegistration(this.registrationForm.value)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.registrationForm.reset();
        this.router.navigate(['/list-member']);
      });
    } else {
      // Affichez un message d'erreur ou prenez les mesures appropriées
    }
  }

  fillFormToUpdate(user: User) {
    const formValues = {
      firstName: user.firstName || this.oldValues?.firstName,
      lastName: user.lastName || this.oldValues?.lastName,
      email: user.email || this.oldValues?.email,
      mobile: user.mobile || this.oldValues?.mobile,
      weight: user.weight || this.oldValues?.weight,
      height: user.height || this.oldValues?.height,
      bmi: user.bmi || this.oldValues?.bmi,
      bmiResult: user.bmiResult || this.oldValues?.bmiResult,
      gender: user.gender || this.oldValues?.gender,
      requireTrainer: user.requireTrainer || this.oldValues?.requireTrainer,
      coachName: user.coachName || this.oldValues?.coachName,
      package: user.package || this.oldValues?.package,
      important: user.important || this.oldValues?.important,
      haveGymBefore: user.haveGymBefore || this.oldValues?.haveGymBefore,
      enquiryDate: user.enquiryDate || this.oldValues?.enquiryDate
    };

    this.registrationForm.patchValue(formValues);
  }

  update() {
    const formValues = this.registrationForm.value;
    
    this.api.updateRegisterUser(formValues, this.userIdToUpdate)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'User Details Updated Successful', duration: 3000 });
        this.router.navigate(['/list-member']);
        this.registrationForm.patchValue(formValues); // Utiliser patchValue au lieu de reset
      });
  }
  
  

  calculateBmi(value: number) {
    const weight = this.registrationForm.value.weight;
    const height = value;
    
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registrationForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registrationForm.controls['bmiResult'].patchValue("Overweight");
        break;
      default:
        this.registrationForm.controls['bmiResult'].patchValue("Obese");
        break;
    }    
  }
}
