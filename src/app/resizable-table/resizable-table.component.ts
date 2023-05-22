import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import {
  ColumnSchema,
  DataService,
  COLUMNS_SCHEMA,
} from './shared/data.service';

@Component({
  selector: 'resizable-table',
  styleUrls: ['resizable-table.component.scss'],
  templateUrl: 'resizable-table.component.html',
  providers: [DataService],
})
export class ResizableTableComponent implements AfterViewInit {
  columnsSchema: ColumnSchema[] = COLUMNS_SCHEMA;
  displayedColumns: string[] = this.columnsSchema.map((col) => col.key);
  subscription: Subscription;
  inputValidation: { [key: string]: { [key: string]: boolean } } = {};

  constructor(public dataService: DataService) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.subscription = this.dataService.dataObservable.subscribe((data) => {
      localStorage.setItem('data', JSON.stringify(data));
      this.dataService.localData = data;
    });
  }

  ngAfterViewInit() {
    this.dataService.dataSource.sort = this.sort;
    this.dataService.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataService.dataSource.filter = filterValue.trim().toLowerCase();
  }

  inputHandler(e: any, position: number, key: string) {
    if (!this.inputValidation[position]) {
      this.inputValidation[position] = {};
    }
    this.inputValidation[position][key] = e.target.validity.valid;
  }

  disableSubmit(position: number) {
    if (this.inputValidation[position]) {
      return (
        this.dataService.localData.some(
          (elem) => Number(elem.position) === Number(position)
        ) ||
        Object.values(this.inputValidation[position]).some(
          (item) => item === false
        )
      );
    }
    return false;
  }
}
