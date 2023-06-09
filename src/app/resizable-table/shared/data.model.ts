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
    required: true,
  },
  {
    key: 'weight',
    type: 'number',
    label: 'Weight',
    required: true,
  },
  {
    key: 'symbol',
    type: 'text',
    label: 'Symbol',
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
    required: false,
  },
];
