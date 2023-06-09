import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PeriodicElement } from './data.model';
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
  private tableSubject = new Subject<PeriodicElement[]>();
  tableState = this.tableSubject.asObservable();

  constructor() {}

  addRow() {
    const newElement = {
      position: 0,
      name: '',
      weight: 0,
      symbol: '',
      isEdit: true,
      isNew: true,
    };

    this.dataSource.data = [newElement, ...this.dataSource.data];
  }

  cancelChange() {
    this.dataSource.data = this.dataSource.data.filter(
      (element) => !element.isNew
    );
  }

  addElement() {
    this.tableSubject.next(
      this.dataSource.data.map((element) => ({
        ...element,
        position: Number(element.position),
        weight: Number(element.position),
      }))
    );
  }

  removeElement(position: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (element) => element.position !== position
    );
    this.tableSubject.next(this.dataSource.data);
  }
}
