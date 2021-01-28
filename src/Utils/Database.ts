import Item from "./Item";

export default interface Database {
  Create(item: Item): Promise<Item>;
  OpenConnection(dbName: string): Promise<void>;
  Delete(item: Item): Promise<Item>;
  List(): Promise<Array<Item>>;
}
