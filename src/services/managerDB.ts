import Database from "Utils/Database";
import IndexedDB from "Utils/indexedDB";
import Item from "Utils/Item";

let dates: Database;

function getDate() {
  if (dates) {
    return;
  }
  if (window.indexedDB) {
    dates = new IndexedDB();

    return;
  }
  // TODO Agregar local storage como base de datos.
  console.log("Es necesario usar localStorage");
  dates = new IndexedDB();
  dates.OpenConnection("Supermarket");

  return;
}

export function save(descrpition: string): Promise<Item> {
  getDate();

  return new Promise((resolve, reject) => {
    if (descrpition.length <= 0) {
      reject("La descripcion tiene que ser mayor a 0 de longitud");
    }
    let lengthList: number;
    let item: Item;

    ListItems()
      .then((list: Array<Item>) => {
        lengthList = list.length + 1;
        item = {id: lengthList, descrpition};
      })
      .then(() => {
        dates.Create(item).then((value: Item) => {
          resolve(value);
        });
      })
      .catch((error) => {
        reject(error);
      });

    return true;
  });
}

export function ListItems(): Promise<Array<Item>> {
  getDate();

  return dates.List();
}

export function remove(item: Item): Promise<Item> {
  getDate();

  return new Promise((resolve, reject) => {
    dates
      .Delete(item)
      .then((value) => {
        resolve(value);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
