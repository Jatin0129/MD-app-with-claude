export type CollectionsEntity = 'Sobha LLC' | 'Downtown UAQ' | 'Siniya Island';

export const COLLECTIONS_ENTITIES: CollectionsEntity[] = ['Sobha LLC', 'Downtown UAQ', 'Siniya Island'];

export interface CollectionsMISRow {
  entity: CollectionsEntity;
  particular: string;
  dtd: number;
  mtd: number;
  ytd: number;
}

export interface CollectionsMISTotalRow {
  entity: CollectionsEntity;
  label: string;
  dtd: number;
  mtd: number;
  ytd: number;
}

export interface CollectionsSummaryEntity {
  mtd: number;
  ytd: number;
  pctCollection: number;
}

export interface CollectionsSummary {
  entities: Record<CollectionsEntity, CollectionsSummaryEntity>;
  totalCollectionYtd: number;
}

export interface CollectionsMISWorkbookData {
  rows: CollectionsMISRow[];
  totals: Record<CollectionsEntity, CollectionsMISTotalRow>;
  summary: CollectionsSummary;
}

export interface PersistedCollectionsMISState extends CollectionsMISWorkbookData {
  fileName: string;
  updatedAt: string;
}
