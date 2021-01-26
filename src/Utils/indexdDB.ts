import Database from "./Database";
import Item from "./Item";
export default class IndexdDB implements Database {
  private indexDb: IDBFactory;
  private db!: IDBDatabase;
  constructor(private dbName: string) {
    this.indexDb = window.indexedDB;
    const req: IDBOpenDBRequest = this.indexDb.open(this.dbName, 1);

    req.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      if (!e.target) return;
      this.db = req.result;
      this.db.createObjectStore("Item", {keyPath: "id"});
    };
  }
  Creaete(item: Item): boolean {
    let value = false;
    const transaction: IDBTransaction = this.db.transaction("Item", "readwrite");
    const store: IDBObjectStore = transaction.objectStore("Item");

    store.add(item);
    if (!transaction.oncomplete || !transaction.onerror) return false;
    transaction.oncomplete = () => {
      console.log("¡Los datos se han añadido con éxito!");

      value = true;
    };
    transaction.onerror = (ev) => {
      console.error("¡Se ha producido un error!", ev.target);
    };

    return value;
  }
  Delete(item: Item): boolean {
    let value = false;
    const store: IDBObjectStore = this.db.transaction("Item", "readwrite").objectStore("Item");
    const ItemExist: IDBRequest = store.get(item.id);

    ItemExist.onsuccess = () => {
      console.log("Item existe");
      store.delete(item.id);
      value = true;
    };

    ItemExist.onerror = () => {
      console.log("Item no encontrado");
    };

    return value;
  }
  List(): Item[] {
    const AllItem: Array<Item> = [];
    const store: IDBObjectStore = this.db.transaction("Item", "readonly").objectStore("Item");
    const result: IDBRequest<IDBCursorWithValue | null> = store.openCursor();

    result.onsuccess = () => {
      const cursor: IDBCursorWithValue | null = result.result;

      if (cursor) {
        console.log("Dato encontrado: ", cursor);
        AllItem.push(cursor.value);
        cursor.continue();
      } else {
        console.log("Dato no encontrado");
      }
    };

    return AllItem;
  }
}
