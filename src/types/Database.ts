import Item from "types/Item";

export default interface Database {
  OpenConnection(dbName: string): Promise<void>;
  Create(item: Item): Promise<Item>;
  Delete(item: Item): Promise<Item>;
  List(): Promise<Array<Item>>;
}
