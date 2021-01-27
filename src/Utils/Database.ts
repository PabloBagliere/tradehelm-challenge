import Item from "./Item";

export default interface Database {
  Creaete(item: Item): Promise<Item>;
  Delete(item: Item): Promise<Item>;
  List(): Promise<Array<Item>>;
}
