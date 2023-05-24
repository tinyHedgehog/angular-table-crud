import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import data from './mock-data.json';

const newElement = {
  position: 0,
  name: '',
  weight: 0,
  symbol: '',
  isEdit: true,
};

@Injectable({ providedIn: 'root' })
export class DataService {
  ELEMENT_DATA: PeriodicElement[] = data.elements;
  localData: PeriodicElement[] = JSON.parse(
    localStorage.getItem('data') || '[]'
  );
  dataSource = new MatTableDataSource(
    (this.localData.length && this.localData) || this.ELEMENT_DATA
  );

  constructor() {}

  addRow() {
    this.dataSource.data = [newElement, ...this.dataSource.data];
  }

  addElement() {
    localStorage.setItem(
      'data',
      JSON.stringify(
        this.dataSource.data.map((element) => ({
          ...element,
          position: Number(element.position),
          weight: Number(element.position),
        }))
      )
    );

    this.localData = JSON.parse(localStorage.getItem('data') || '[]');
  }

  removeElement(position: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (element) => element.position !== position
    );
    localStorage.setItem('data', JSON.stringify(this.dataSource.data));
    this.localData = JSON.parse(localStorage.getItem('data') || '[]');
  }
}

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  isEdit?: boolean;
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
