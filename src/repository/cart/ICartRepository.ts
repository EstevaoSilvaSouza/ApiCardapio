export interface ICartRepository<T> {
  Create(): Promise<boolean | null>;
  ListId(date: T, date2: T): Promise<T[] | null>;
}

export abstract class CartAbsRepository implements ICartRepository<any> {
  abstract Create(): Promise<boolean | null>;
  abstract ListId(IdTable: number, CartName: string): Promise<any[] | null>;
}
