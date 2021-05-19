import Database from "types/Database";
import IndexedDB from "Utils/indexedDB";
import LocalStorage from "Utils/localStorage";

const ManagerDB = async (): Promise<Database> => {
  let Manager: Database;

  if (global.indexedDB) {
    Manager = new IndexedDB();
  } else {
    Manager = new LocalStorage();
  }
  try {
    await Manager.OpenConnection("Supermaket");

    return Manager;
  } catch (error) {
    throw new Error(`Error al inicializar el manager ${error}`);
  }
};

export default ManagerDB;
