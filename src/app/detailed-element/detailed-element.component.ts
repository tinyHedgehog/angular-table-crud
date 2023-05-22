import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import data from '../../assets/mock-data.json';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-detailed-element',
  templateUrl: './detailed-element.component.html',
  styleUrls: ['./detailed-element.component.css'],
})
export class DetailedElementComponent implements OnInit {
  localData: PeriodicElement[] = JSON.parse(
    localStorage.getItem('data') || '[]'
  );
  dataSource: PeriodicElement[] =
    (this.localData.length && this.localData) || data.elements;
  currentElement?: PeriodicElement;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentElement = this.dataSource.find(
        (elem) => elem.position.toString() === params['id']
      );
    });
  }
}
