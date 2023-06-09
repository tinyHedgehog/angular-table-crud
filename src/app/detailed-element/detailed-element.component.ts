import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../resizable-table/shared/data.service';
import { PeriodicElement } from '../resizable-table/shared/data.model';

@Component({
  selector: 'detailed-element',
  styleUrls: ['detailed-element.component.scss'],
  templateUrl: './detailed-element.component.html',
  providers: [DataService],
})
export class DetailedElementComponent implements OnInit {
  currentElement?: PeriodicElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentElement = this.dataService.dataSource.data.find((elem) => {
        return elem.position.toString() === params['position'];
      });

      !this.currentElement && this.router.navigate(['404']);
    });
  }
}
