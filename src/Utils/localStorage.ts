import Database from "types/Database";
import Item from "types/Item";

export default class localStorage implements Database {
  private db!: Storage;
  private dataSet!: string;
  private initialized = false;
  OpenConnection(dbName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.initialized) resolve();
      try {
        this.db = window.localStorage;
        this.dataSet = dbName;
        this.initialized = true;
        resolve();
      } catch (error) {
        reject(`Error no se a podido inicializar: ${error}`);
      }
    });
  }
  Create(item: Item): Promise<Item> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) reject("No inicializado");
      try {
        const items: Array<Item> = this.GetListParse();

        items.filter((itemInser) => {
          if (itemInser.id == item.id || itemInser.descrpition == item.descrpition) {
            reject("Error item duplicado");
          }
        });
        items.push(item);
        this.db.setItem(this.dataSet, JSON.stringify(items));
        resolve(item);
      } catch (error) {
        reject(`Error al guardar un item: ${error}`);
      }
    });
  }
  Delete(item: Item): Promise<Item> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) reject("No inicializado");
      try {
        const items: Array<Item> = this.GetListParse();

        if (items.length == 0) reject("Error: No existe el item");
        const newList: Array<Item> = items.filter((itemInter) => itemInter.id != item.id);

        if (items.length == newList.length) reject("Error: item no encontrado");

        this.db.setItem(this.dataSet, JSON.stringify(newList));
        resolve(item);
      } catch (error) {
        reject(`Error al eliminar un item: ${error}`);
      }
    });
  }
  List(): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      if (!this.initialized) reject("No inicializado");
      try {
        const itemsParse: Array<Item> = this.GetListParse();

        resolve(itemsParse);
      } catch (error) {
        reject(`Error al optener los items: ${error}`);
      }
    });
  }
  private GetListParse(): Array<Item> {
    return JSON.parse(this.db.getItem(this.dataSet) as string) || [];
  }
}
