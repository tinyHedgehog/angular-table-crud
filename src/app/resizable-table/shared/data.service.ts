import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import data from './mock-data.json';

@Injectable({ providedIn: 'root' })
export class DataService {
  ELEMENT_DATA: PeriodicElement[] = data.elements;
  localData: PeriodicElement[] = JSON.parse(
    localStorage.getItem('data') || '[]'
  );
  dataSource = new MatTableDataSource(
    (this.localData.length && this.localData) || this.ELEMENT_DATA
  );
  private dataSubject = new Subject<PeriodicElement[]>();
  dataObservable: Observable<PeriodicElement[]> =
    this.dataSubject.asObservable();

  constructor() {}

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
      (element) => Number(element.position) !== Number(position)
    );
    this.dataSubject.next(this.dataSource.data);
  }
}

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

export interface ColumnSchema {
  key: string;
  type: 'number' | 'text' | 'isEdit';
  label: string;
  required: boolean;
  isEdit?: boolean;
}

export const COLUMNS_SCHEMA: ColumnSchema[] = [
  {
    key: 'position',
    type: 'number',
    label: 'Position',
    required: true,
  },
  {
    key: 'name',
    type: 'text',
    label: 'Name',
    required: false,
  },
  {
    key: 'weight',
    type: 'number',
    label: 'Weight',
    required: false,
  },
  {
    key: 'symbol',
    type: 'text',
    label: 'Symbol',
    required: false,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
    required: false,
  },
];
