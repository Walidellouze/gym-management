import { Api2Service } from './../service/api2.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Coach } from '../models/register2.model';

@Component({
  selector: 'app-coach-detail',
  templateUrl: './coach-detail.component.html',
  styleUrls: ['./coach-detail.component.scss']
})
export class CoachDetailComponent implements OnInit{


  coachId!: number;
  coachDetails!: Coach;
  constructor(private activatedRoute: ActivatedRoute, private api2: Api2Service) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.coachId = val['id'];
      this.fetchCoachDetails(this.coachId);
    })
  }

  fetchCoachDetails(coachId: number) {
    this.api2.getRegisteredCoachId(coachId)
      .subscribe({
        next: (res) => {
          this.coachDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }


}
