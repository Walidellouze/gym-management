import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // ajout de l'import de ActivatedRoute
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface NavItem {
  name: string;
  link?: string;
  children?: NavItem[];
}

const TREE_DATA: NavItem[] = [
  {
    name: 'Employment',
    link: '/emploi',
    children: [
      { name: 'Subitem 1' },
      { name: 'Subitem 2' },
    ],
  },
  {
    name: 'Members List',
    link: '/list-member',
    children: [
      { name: 'Subitem 1' },
      { name: 'Subitem 2' },
    ],
  },
];

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {


  treeControl = new NestedTreeControl<NavItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItem>();
  title = 'GymRegistrationCrud';
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { // ajout de activatedRoute dans le constructeur
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: NavItem) => !!node.children && node.children.length > 0;

  HomeClick() {
    this.router.navigate(['Home']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToPage(link: string | undefined) {
    if (link) {
      this.router.navigate([link]);
      this.sidenav.close();
    }
  }
}


