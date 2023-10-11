import { Component, OnInit } from '@angular/core';
import { Api2Service } from '../service/api2.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Cours {
  jour: string;
  heureDebut: string;
  heureFin: string;
  nomsCours: string;
  coachnames: string;
  rowspan: number;
  index: number;
}

@Component({
  selector: 'app-emploi-du-temps',
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.scss']
})
export class EmploiDuTempsComponent implements OnInit {
  joursSemaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  emploiDuTemps: Cours[] = [];
  coursList: string[] = ["Cardio ", " Musculation ", "Yoga", "Pilates",
    "Danse ",
    "Boxing ",
    "Zumba",
    "kickboxing"];

  coachList: string[] = [];
  selectedCours: string = '';
  coachnames: string = '';
  coachIdList: number[] = [];
  

  constructor(private api2: Api2Service, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.api2.getRegisteredCoach().subscribe((Coache) => {
      this.coachList = Coache.map((coach) => coach.firstName);
    });
    this.api2.getRegisteredCoach().subscribe((Coache) => {
      this.coachIdList = Coache.map((coach) => coach.id);
    });

    // Enregistrer les données du tableau de l'emploi dans une session
    if (sessionStorage.getItem('emploiDuTemps')) {
      this.emploiDuTemps = JSON.parse(sessionStorage.getItem('emploiDuTemps')!);
    }
  }

  ajouterCours(cours: any) {
    const newCours = {
      jour: cours.jour,
      heureDebut: cours.heureDebut,
      heureFin: cours.heureFin,
      nomsCours: this.selectedCours,
      coachnames: this.coachnames,
      rowspan: this.calculerRowspan(cours.heureDebut, cours.heureFin),
      index: this.emploiDuTemps.length
    };
    this.emploiDuTemps.push(newCours);

    // Enregistrer les données du tableau de l'emploi dans une session
    sessionStorage.setItem('emploiDuTemps', JSON.stringify(this.emploiDuTemps));
  }

  supprimerCours(index: number): void {
    this.emploiDuTemps.splice(index, 1);

    // Enregistrer les données du tableau de l'emploi dans une session
    sessionStorage.setItem('emploiDuTemps', JSON.stringify(this.emploiDuTemps));
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Le modal a été fermé avec un bouton
    }, (reason) => {
      // Le modal a été fermé avec le bouton "Fermer"
    });
  }

  calculerRowspan(heureDebut: string, heureFin: string): number {
    const debut = parseInt(heureDebut.split(':')[0], 10);
    const fin = parseInt(heureFin.split(':')[0], 10);
    return (fin - debut) * 2;
  }

  isCours(heure: number, jour: string): boolean {
    return this.emploiDuTemps.some(cours => cours.jour === jour && parseInt(cours.heureDebut, 10) === heure);
  }

  getCours(heure: number, jour: string): Cours {
    return this.emploiDuTemps.find(cours => cours.jour === jour && parseInt(cours.heureDebut, 10) === heure)!;
  }

  getUniqueHeuresDebut(): number[] {
    const heuresDebut = this.emploiDuTemps.map(cours => parseInt(cours.heureDebut, 10));
    return Array.from(new Set(heuresDebut)).sort((a, b) => a - b);
  }

  resetSchedule(): void {
    this.emploiDuTemps = [];
    sessionStorage.removeItem('emploiDuTemps');
    
  }
}
