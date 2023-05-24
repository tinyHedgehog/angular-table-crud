import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { DataService } from './shared/data.service';
import {
  PeriodicElement,
  ColumnSchema,
  COLUMNS_SCHEMA,
} from './shared/data.model';

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
  editField: number;
  private subscription: Subscription;

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

    this.subscription = this.dataService.tableState.subscribe(
      (state: PeriodicElement[]) => {
        localStorage.setItem('data', JSON.stringify(state));
        this.dataService.localData = JSON.parse(
          localStorage.getItem('data') || '[]'
        );
      }
    );
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
        isEdit: element.position === position,
      })
    );
    this.editField = position;
  }

  disableEdit() {
    return this.dataService.dataSource.data.some((element) => element.isEdit);
  }

  disableSubmit(position: number) {
    const savedElements: PeriodicElement[] = JSON.parse(
      localStorage.getItem('data') || '[]'
    );
    const isDuplicate = savedElements.some(
      (elem) => elem.position === position
    );

    if (this.inputValidation[position]) {
      const isValid = Object.values(this.inputValidation[position]).some(
        (item) => item === false
      );

      return this.editField
        ? this.editField !== position && (isDuplicate || isValid)
        : isDuplicate || isValid;
    }
    return true;
  }
}
