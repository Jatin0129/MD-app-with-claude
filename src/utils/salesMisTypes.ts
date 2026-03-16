export type SalesEntity = 'Sobha LLC' | 'Downtown UAQ' | 'Siniya Island';

export const SALES_ENTITIES: SalesEntity[] = ['Sobha LLC', 'Downtown UAQ', 'Siniya Island'];

export interface SalesMISRow {
  entity: SalesEntity;
  community: string;
  project: string;
  dtd: number;
  mtd: number;
  ytd: number;
}

export interface PersistedSalesMISState {
  fileName: string;
  rows: SalesMISRow[];
  updatedAt: string;
}
