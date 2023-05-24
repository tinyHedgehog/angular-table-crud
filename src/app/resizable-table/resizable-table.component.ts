import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  ColumnSchema,
  DataService,
  COLUMNS_SCHEMA,
  PeriodicElement,
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
  inputValidation: { [key: string]: { [key: string]: boolean } } = {};
  editField: string | number = '';

  constructor(public dataService: DataService) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    if (!this.dataService.localData.length) {
      localStorage.setItem(
        'data',
        JSON.stringify(this.dataService.ELEMENT_DATA)
      );
    }
  }

  ngAfterViewInit() {
    this.dataService.dataSource.sort = this.sort;
    this.dataService.dataSource.paginator = this.paginator;
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

  setEditField(position: number) {
    this.dataService.dataSource.data = this.dataService.dataSource.data.map(
      (element) => ({
        ...element,
        isEdit: Number(element.position) === Number(position),
      })
    );
    this.editField = position;
  }

  disableSubmit(position: number) {
    const alreadySavedElements: PeriodicElement[] = JSON.parse(
      localStorage.getItem('data') || '[]'
    );

    if (this.inputValidation[position]) {
      return this.editField
        ? Number(this.editField) !== Number(position) &&
            (alreadySavedElements.some(
              (elem) => Number(elem.position) === Number(position)
            ) ||
              Object.values(this.inputValidation[position]).some(
                (item) => item === false
              ))
        : alreadySavedElements.some(
            (elem) => Number(elem.position) === Number(position)
          ) ||
            Object.values(this.inputValidation[position]).some(
              (item) => item === false
            );
    }
    return false;
  }
}
