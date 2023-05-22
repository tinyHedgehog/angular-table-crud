import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ColumnSchema, DataService, COLUMNS_SCHEMA } from './data.service';

@Component({
  selector: 'resizable-table',
  styleUrls: ['resizable-table.component.scss'],
  templateUrl: 'resizable-table.component.html',
  providers: [DataService],
})
export class ResizableTableComponent implements AfterViewInit {
  columnsSchema: ColumnSchema[] = COLUMNS_SCHEMA;
  displayedColumns: string[] = this.columnsSchema.map((col) => col.key);

  constructor(public dataService: DataService) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataService.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataService.dataObservable.subscribe((data) => {
      localStorage.setItem('data', JSON.stringify(data));
    });
  }

  ngAfterViewInit() {
    this.dataService.dataSource.sort = this.sort;
    this.dataService.dataSource.paginator = this.paginator;
  }
}
