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
  currentElement?: PeriodicElement;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentElement = data.elements.find(
        (elem) => elem.position.toString() === params['id']
      );
    });
  }
}
