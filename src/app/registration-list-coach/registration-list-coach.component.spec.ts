import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationListCoachComponent } from './registration-list-coach.component';

describe('RegistrationListCoachComponent', () => {
  let component: RegistrationListCoachComponent;
  let fixture: ComponentFixture<RegistrationListCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationListCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationListCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
