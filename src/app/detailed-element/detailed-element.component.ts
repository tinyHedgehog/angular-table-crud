import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../resizable-table/data.service';

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
  providers: [DataService],
})
export class DetailedElementComponent implements OnInit {
  currentElement?: PeriodicElement;

  constructor(private route: ActivatedRoute, public dataService: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentElement = this.dataService.dataSource.data.find(
        (elem) => elem.position.toString() === params['id']
      );
    });
  }
}
