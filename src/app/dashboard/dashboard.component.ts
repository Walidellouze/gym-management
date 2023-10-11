import { Component, OnInit } from '@angular/core';
import { ApiService } from './../service/api.service';
import { User } from './../models/register.model';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 public users!: User[];
  dataSource!: MatTableDataSource<User>;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender', 'importantList','coachName' ,'package', 'enquiryDate', 'action'];



  constructor(private apiService: ApiService, private router: Router, private confirmService: NgConfirmService, private toastService: NgToastService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getRegisteredUser()
      .subscribe({
        next: (res) => {
          this.users = res.map(user => {
            // Assuming the image URL is stored in the 'image' property of the user object
            user.image = user.image ? user.image : '/assets/images/default-user-image ' + user.id + '.png'; // Replace with the path to your default user image
            return user;

          });
          this.dataSource = new MatTableDataSource(this.users);


          this.createPieChart();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
 
 

  createPieChart() {
    // Récupérer les données nécessaires pour le graphique en secteurs
    const genderData: { [key: string]: number } = {};
    const bmiResultData: { [key: string]: number } = {};
    const importantData: { [key: string]: number } = {};
    const coachNameData: { [key: string]: number } = {};
    
    for (const user of this.users) {
      if (user.gender) {
        genderData[user.gender] = (genderData[user.gender] || 0) + 1;
      }
      if (user.bmiResult) {
        bmiResultData[user.bmiResult] = (bmiResultData[user.bmiResult] || 0) + 1;
      }
      if (user.coachName) {
        coachNameData[user.coachName] = (coachNameData[user.coachName] || 0) + 1;
      }
    }
  
    // Créer un nouveau canvas pour le graphique en secteurs
    const pieChartCanvas = document.getElementById('pie-chart') as HTMLCanvasElement;
    const pieChartCtx = pieChartCanvas.getContext('2d');
  
    if (pieChartCtx) { // Vérifier que le contexte est valide (non nul)
      // Créer le graphique en secteurs avec des options de dimension
      new Chart(pieChartCtx, {
        type: 'pie',
        data: {
          labels: Object.keys(genderData),
          datasets: [{
            data: Object.values(genderData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] // Couleurs pour chaque secteur
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 0.4, 
        }
      });



      const coachNameChartCanvas = document.getElementById('coachName-chart') as HTMLCanvasElement;
      const coachNameChartCtx = coachNameChartCanvas.getContext('2d');
    
      if (coachNameChartCtx) { // Vérifier que le contexte est valide (non nul)
        // Créer le graphique en secteurs avec des options de dimension
        new Chart(coachNameChartCtx, {
          type: 'pie',
          data: {
            labels: Object.keys(coachNameData),
            datasets: [{
              data: Object.values(coachNameData),
              backgroundColor: ['#1526da','#47a815','#FF6384', '#36A2EB', '#FFCE56'] // Couleurs pour chaque secteur
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.4, 
          }
        });

      
  
      // Créer le graphique en secteurs pour bmiResult avec des options de dimension
      const bmiResultChartCanvas = document.getElementById('bmi-result-chart') as HTMLCanvasElement;
      const bmiResultChartCtx = bmiResultChartCanvas.getContext('2d');
  
      if (bmiResultChartCtx) { // Vérifier que le contexte est valide (non nul)
        new Chart(bmiResultChartCtx, {
          type: 'pie',
          data: {
            labels: Object.keys(bmiResultData),
            datasets: [{
              data: Object.values(bmiResultData),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] // Couleurs pour chaque secteur
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.4, 
          }
        });
      }
    }
    for (const user of this.users) {
      if (user.important) {
        for (const important of user.important) {
          importantData[important] = (importantData[important] || 0) + 1;
        }
      }
    }
  
    // Créer un nouveau canvas pour le graphique en secteurs
    const importantChartCanvas = document.getElementById('important-chart') as HTMLCanvasElement;
    const importantChartCtx = importantChartCanvas.getContext('2d');
  
    if (importantChartCtx) { // Vérifier que le contexte est valide (non nul)
      // Créer le graphique en secteurs avec des options de dimension
      new Chart(importantChartCtx, {
        type: 'pie',
        data: {
          labels: Object.keys(importantData),
          datasets: [{
            data: Object.values(importantData),
            backgroundColor: ['#1526da','#47a815','#FF6384', '#36A2EB', '#FFCE56'] // Couleurs pour chaque secteur
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 0.4, 
        }
      });
    }

    for (const user of this.users) {
      if (user.important) {
        for (const important of user.important) {
          importantData[important] = (importantData[important] || 0) + 1;
        }
      }
    }
  
  }
  }
  

}
