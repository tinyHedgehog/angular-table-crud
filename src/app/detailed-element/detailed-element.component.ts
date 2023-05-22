import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DataService,
  PeriodicElement,
} from '../resizable-table/shared/data.service';

@Component({
  selector: 'detailed-element',
  templateUrl: './detailed-element.component.html',
  providers: [DataService],
})
export class DetailedElementComponent implements OnInit {
  currentElement?: PeriodicElement;

  constructor(private route: ActivatedRoute, public dataService: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentElement = this.dataService.dataSource.data.find(
        (elem) => elem.position.toString() === params['position']
      );
    });
  }
}
