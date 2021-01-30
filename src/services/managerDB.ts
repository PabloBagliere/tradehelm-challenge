import Database from "types/Database";
import IndexedDB from "Utils/indexedDB";
import LocalStorage from "Utils/localStorage";
import Item from "types/Item";

export default class ManagerDB {
  private DB!: Database;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static async initialized(): Promise<ManagerDB> {
    const Manager = new ManagerDB();

    if (window.indexedDB) {
      Manager.DB = new IndexedDB();
    } else {
      Manager.DB = new LocalStorage();
    }
    try {
      await Manager.DB.OpenConnection("Supermaket");

      return Manager;
    } catch (error) {
      throw new Error(`Error al inicializar el manager ${error}`);
    }
  }
  async createItem(descrpition: string): Promise<Item> {
    if (descrpition.length <= 0) throw new Error("Item demaciada corta");
    try {
      const list = await this.DB.List();
      const item: Item = {id: list.length, descrpition};
      const itemCreate = await this.DB.Create(item);

      return itemCreate;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteItem(item: Item): Promise<boolean> {
    try {
      await this.DB.Delete(item);

      return true;
    } catch (error) {
      return error;
    }
  }
  async listItems(): Promise<Array<Item>> {
    try {
      return await this.DB.List();
    } catch (error) {
      throw new Error(error);
    }
  }
}
