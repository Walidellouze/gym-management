import { Router } from '@angular/router';
import { ApiService } from './../service/api.service';
import { Api2Service } from './../service/api2.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { Coach } from '../models/register2.model';

@Component({
 
selector: 'app-registration-list-coach',
templateUrl: './registration-list-coach.component.html',
styleUrls: ['./registration-list-coach.component.scss']
})
export class RegistrationListCoachComponent implements OnInit {
  public users!: Coach[];
  dataSource!: MatTableDataSource<Coach>;
  usernames: string[] = [];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile','Members', 'package',  'action'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api2Service: Api2Service, private router: Router, private confirmService: NgConfirmService, private toastService: NgToastService,private api: ApiService) { }

  ngOnInit() {
    this.getCoachs();

    const coachNameToSearch = 'firstName';
    // Récupération des noms des users
    this.api.getRegisteredUser().subscribe((User) => {
      this.usernames = User.map((user) => user.firstName);
    });
  

  
    
  
     
  }
  


  

  getCoachs() {
    this.api2Service.getRegisteredCoach().subscribe({
      next: (res) => {
        this.users = res.map(user => {
          // Assuming the image URL is stored in the 'image' property of the user object
          user.image = user.image ? user.image : '/assets/images/default-user-image '+ user.id +'.png'; // Replace with the path to your default user image
          return user;
        });
  
        this.getSelectedMembers(); // Appel de la méthode pour récupérer les membres sélectionnés
  
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  edit(id: number) {
    this.router.navigate(['update-coach', id])
  }

  deleteCoach(id: number) {
    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {
        //your logic if Yes clicked
        this.api2Service.deleteRegistered(id)
          .subscribe({
            next: (res) => {
              this.toastService.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000 });
              this.getCoachs();
            },
            error: (err) => {
              this.toastService.error({ detail: 'ERROR', summary: 'Something went wrong!', duration: 3000 });
            }
          })
      },
      () => {
        //yor logic if No clicked
      })

  }
  getSelectedMembers() {
    for (const coach of this.users) {
      this.api.getRegisteredUserByCoach(coach.firstName).subscribe((members) => {
        const memberNames = members.map(member => `${member.firstName} ${member.lastName}`);
        coach.Members = memberNames.join(', ');
      });
    }
  }
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
