import Database from "Utils/Database";
import IndexdDB from "Utils/indexdDB";
import Item from "Utils/Item";

let dates: Database;

function getDate() {
  if (dates) {
    return dates;
  }
  if (window.indexedDB) {
    dates = new IndexdDB("Supermarket");

    return dates;
  }
  // TODO Agregar local storage como base de datos.
  console.log("Es necesario usar localStorage");
  dates = new IndexdDB("Supermarket");

  return dates;
}

export async function save(descrpition: string): Promise<boolean> {
  const date = getDate();

  if (descrpition.length <= 0) {
    throw new Error("La descripcion tiene que ser mayor a 0 de longitud");
  }

  const lengthList = ListItems().length + 1;
  const item: Item = {id: lengthList, descrpition};

  if (!date.Creaete(item)) {
    throw new Error("No se a podido guaardar la informacion");
  }

  return true;
}

export function ListItems(): Array<Item> {
  return getDate().List();
}

export function remove(item: Item): boolean {
  const date = getDate();

  if (!date.Delete(item)) {
    throw new Error("No se a podido eliminar");
  }

  return true;
}
