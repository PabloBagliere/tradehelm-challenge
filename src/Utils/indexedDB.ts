import Database from "./Database";
import Item from "./Item";

enum mode {
  READONLY = "readonly",
  READWRITE = "readwrite",
  VERSIONCHANGE = "versionchange",
}

export default class IndexedDB implements Database {
  private indexDb!: IDBFactory;
  private db!: IDBDatabase;
  private dataSet = "Items";
  private initialized = false;
  OpenConnection(dbName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.initialized) resolve();
      this.indexDb = window.indexedDB;
      const req: IDBOpenDBRequest = this.indexDb.open(dbName);

      req.onupgradeneeded = () => {
        req.result.createObjectStore(this.dataSet, {keyPath: "id"});
      };
      req.onerror = () => {
        reject(`Error al crear la db en indexdDB ${req.error}`);
      };
      req.onsuccess = () => {
        this.db = req.result;
        this.initialized = true;
        resolve();
      };
    });
  }
  Create(item: Item): Promise<Item> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) reject("No inicializado");
      const store: IDBObjectStore = this.getObjectStore(this.dataSet, mode.READWRITE);
      const req: IDBRequest = store.add(item);

      req.onerror = () => {
        reject(`Error al agregar un item ${req.error?.name}`);
      };
      req.onsuccess = () => {
        resolve(item);
      };
    });
  }
  Delete(item: Item): Promise<Item> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) reject("No inicializado");
      const store: IDBObjectStore = this.getObjectStore(this.dataSet, mode.READWRITE);
      const ItemExist: IDBRequest = store.get(item.id);

      ItemExist.onsuccess = () => {
        if (!ItemExist.result) reject("Error: item no encontrado");
        store.delete(item.id);
        resolve(item);
      };
      ItemExist.onerror = () => {
        reject(`Error item no encontrado ${ItemExist.error?.name}`);
      };
    });
  }
  List(): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) reject("No inicializado");
      const AllItem: Array<Item> = [];
      const store: IDBObjectStore = this.getObjectStore(this.dataSet, mode.READONLY);
      const result: IDBRequest<IDBCursorWithValue | null> = store.openCursor();

      result.onsuccess = () => {
        const cursor: IDBCursorWithValue | null = result.result;

        if (cursor) {
          AllItem.push(cursor.value);
          cursor.continue();
        } else {
          resolve(AllItem);
        }
      };
      result.onerror = () => {
        reject(`Error al buscar en la IndexdDB ${result.error?.name}`);
      };
    });
  }
  private getObjectStore(store_name: string, mode: mode): IDBObjectStore {
    const tx = this.db.transaction(store_name, mode);

    return tx.objectStore(store_name);
  }
}
