import Item from "./Item";

export default interface Database {
  Creaete(item: Item): boolean;
  Delete(item: Item): boolean;
  List(): Array<Item>;
}
