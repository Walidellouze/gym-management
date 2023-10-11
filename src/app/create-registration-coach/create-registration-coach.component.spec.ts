import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegistrationCoachComponent } from './create-registration-coach.component';

describe('CreateRegistrationCoachComponent', () => {
  let component: CreateRegistrationCoachComponent;
  let fixture: ComponentFixture<CreateRegistrationCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRegistrationCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRegistrationCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
