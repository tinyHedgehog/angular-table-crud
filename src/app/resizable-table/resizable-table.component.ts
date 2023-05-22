import {
  AfterViewInit,
  Component,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Observable } from 'rxjs';

import data from '../../assets/mock-data.json';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = data.elements;

const COLUMNS_SCHEMA = [
  {
    key: 'position',
    type: 'number',
    label: 'Position',
  },
  {
    key: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'weight',
    type: 'number',
    label: 'Weight',
  },
  {
    key: 'symbol',
    type: 'text',
    label: 'Symbol',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'resizable-table',
  styleUrls: ['resizable-table.component.scss'],
  templateUrl: 'resizable-table.component.html',
})
export class ResizableTableComponent implements AfterViewInit {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  localData: PeriodicElement[] = JSON.parse(
    localStorage.getItem('data') || '[]'
  );
  dataSource = new MatTableDataSource(
    (this.localData.length && this.localData) || ELEMENT_DATA
  );
  columnsSchema: any = COLUMNS_SCHEMA;
  private dataSubject = new Subject<PeriodicElement[]>();
  dataObservable: Observable<any> = this.dataSubject.asObservable();

  constructor() {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataObservable.subscribe((data) => {
      console.log(data);
      localStorage.setItem('data', JSON.stringify(this.dataSource.data));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addRow() {
    const newElement = {
      position: 0,
      name: '',
      weight: 0,
      symbol: '',
      isEdit: true,
    };

    this.dataSource.data = [newElement, ...this.dataSource.filteredData];
  }

  addElement() {
    this.dataSubject.next(this.dataSource.data);
  }

  removeElement(position: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (element) => element.position !== position
    );
    this.dataSubject.next(this.dataSource.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
