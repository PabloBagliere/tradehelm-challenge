import Database from "./Database";
import Item from "./Item";
export default class IndexdDB implements Database {
  indexDb: IDBFactory;
  db!: IDBDatabase;
  dataSet = "Item";
  constructor(private dbName: string) {
    this.indexDb = window.indexedDB;
    const req: IDBOpenDBRequest = this.indexDb.open(this.dbName, 1);

    req.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      if (!e.target) return;
      this.db = req.result;
      this.db.createObjectStore(this.dataSet, {keyPath: "id"});
    };
    req.onerror = () => {
      throw new Error(`Error al crear la db in el indexdDB ${req.error}`);
    };
  }
  Creaete(item: Item): boolean {
    let value = false;
    const transaction: IDBTransaction = this.db.transaction(this.dataSet, "readwrite");
    const store: IDBObjectStore = transaction.objectStore(this.dataSet);

    store.add(item);
    if (!transaction.oncomplete || !transaction.onerror) return false;
    transaction.oncomplete = () => {
      value = true;
    };
    transaction.onerror = () => {
      throw new Error(`Error al agregar un item ${transaction.error}`);
    };

    return value;
  }
  Delete(item: Item): boolean {
    let value = false;
    const store: IDBObjectStore = this.db
      .transaction(this.dataSet, "readwrite")
      .objectStore(this.dataSet);
    const ItemExist: IDBRequest = store.get(item.id);

    ItemExist.onsuccess = () => {
      store.delete(item.id);
      value = true;
    };

    ItemExist.onerror = () => {
      throw new Error(`Error item no encontrado ${ItemExist.error}`);
    };

    return value;
  }
  List(): Item[] {
    const AllItem: Array<Item> = [];
    const store: IDBObjectStore = this.db
      .transaction(this.dataSet, "readonly")
      .objectStore(this.dataSet);
    const result: IDBRequest<IDBCursorWithValue | null> = store.openCursor();

    result.onsuccess = () => {
      const cursor: IDBCursorWithValue | null = result.result;

      if (cursor) {
        AllItem.push(cursor.value);
        cursor.continue();
      }
    };
    result.onerror = () => {
      throw new Error(`Error al crear buscar en la IndexdDB ${result.error}`);
    };

    return AllItem;
  }
}
