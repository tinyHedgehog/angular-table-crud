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
import { DIGIT_0, DIGIT_9, PERIOD } from './resizable-table.constants';

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
        this.editField = 0;
      }
    );
  }

  ngAfterViewInit() {
    this.dataService.dataSource.sort = this.sort;
    this.dataService.dataSource.paginator = this.paginator;
  }

  cancelChange() {
    this.dataService.dataSource.data = this.dataService.dataSource.data.filter(
      (element) => !element.isNew
    );
    this.dataService.dataSource.data = this.dataService.localData.map(
      (elem) => ({
        ...elem,
        isEdit: false,
      })
    );
    this.editField = 0;
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

  allowValidInput(e: any, colKey: string) {
    if (colKey === 'position') {
      return e.charCode >= DIGIT_0 && e.charCode <= DIGIT_9;
    }
    if (colKey === 'weight') {
      return (
        (e.charCode >= DIGIT_0 && e.charCode <= DIGIT_9) ||
        e.charCode === PERIOD
      );
    }

    return e.charCode;
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

  disableAdd() {
    return this.dataService.dataSource.data.some((element) => element.isNew);
  }

  disableEdit() {
    return this.dataService.dataSource.data.some((element) => element.isEdit);
  }

  getIsDuplicate(position: number) {
    const savedElements: PeriodicElement[] = JSON.parse(
      localStorage.getItem('data') || '[]'
    );
    const isDuplicate = savedElements.some(
      (elem) => elem.position === position
    );

    return isDuplicate;
  }

  getInputValidation(
    position: number,
    isDuplicate: boolean,
    checkedField?: string
  ) {
    if (this.inputValidation[position]) {
      const isValid = checkedField
        ? !this.inputValidation[position][checkedField]
        : Object.values(this.inputValidation[position]).some(
            (item) => item === false
          );

      return this.editField
        ? Number(this.editField) !== position && (isDuplicate || isValid)
        : isDuplicate || isValid;
    }
    return !this.editField || false;
  }

  validatePosition(position: number) {
    const isDuplicate = this.getIsDuplicate(position);

    if (!position) {
      return true;
    }

    return this.getInputValidation(position, isDuplicate, 'position');
  }

  disableSubmit(position: number, element: PeriodicElement) {
    const isDuplicate = this.getIsDuplicate(position);

    if (!position || !element.weight || !element.symbol || !element.name) {
      return true;
    }

    return this.getInputValidation(position, isDuplicate);
  }
}
