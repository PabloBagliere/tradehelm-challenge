import "fake-indexeddb/auto";
import IndexedDB from "Utils/indexedDB";
import Item from "Utils/Item";

const itemTest: Item = {id: 1, descrpition: "Prueba"};
const itemsList: Array<Item> = [
  {id: 0, descrpition: "prueba0"},
  {id: 1, descrpition: "prueba1"},
  {id: 2, descrpition: "prueba2"},
  {id: 3, descrpition: "prueba3"},
  {id: 4, descrpition: "prueba4"},
  {id: 5, descrpition: "prueba5"},
];

test("Create connection with IndexdDB api", () => {
  expect(new IndexedDB()).toBeInstanceOf(IndexedDB);
});

describe("different ways to create item in indexedDB", () => {
  test("Create item in indexedDB", async () => {
    const dataTest = new IndexedDB();

    await dataTest.OpenConnection("Create");
    const data = await dataTest.Create(itemTest);

    expect(data).toBe(itemTest);
  });

  test("Create item in indexedDB without initializing ", async () => {
    const dataTest = new IndexedDB();

    try {
      await dataTest.Create(itemTest);
    } catch (error) {
      expect(error).toEqual("No inicializado");
    }
  });
  test("Create item in indexedDB duplicate", async () => {
    const dataTest = new IndexedDB();

    await dataTest.OpenConnection("Duplicate");
    try {
      await dataTest.Create(itemTest);
      await dataTest.Create(itemTest);
    } catch (error) {
      expect(error).toEqual("Error al agregar un item ConstraintError");
    }
  });
});

describe("different ways to delete item in indexedDB", () => {
  test("Delete item in IndexedDB", async () => {
    const dataTest = new IndexedDB();

    await dataTest.OpenConnection("Delete");
    await dataTest.Create(itemTest);
    const data = await dataTest.Delete(itemTest);

    expect(data).toBe(itemTest);
  });
  test("Delete item in indexedDB without initializing", async () => {
    const dataTest = new IndexedDB();

    try {
      await dataTest.Delete(itemTest);
    } catch (error) {
      expect(error).toEqual("No inicializado");
    }
  });
  test("Delete iten not exist in indexedDB", async () => {
    const dataTest = new IndexedDB();

    await dataTest.OpenConnection("NotExist");
    try {
      await dataTest.Delete(itemTest);
    } catch (error) {
      expect(error).toEqual("Error: item no encontrado");
    }
  });
});

describe("different ways to list item in indexedDB", () => {
  test("List item in IndexedDB", async () => {
    const dataTest = new IndexedDB();

    await dataTest.OpenConnection("List");
    for await (const item of itemsList) {
      dataTest.Create(item);
    }
    const data = await dataTest.List();

    expect(data).toEqual(itemsList);
  });
  test("to list item in indexedDB without initializing", async () => {
    const dataTest = new IndexedDB();

    try {
      await dataTest.List();
    } catch (error) {
      expect(error).toEqual("No inicializado");
    }
  });

  test("list without item in IndexedDB", async () => {
    const dataTest = new IndexedDB();

    await dataTest.OpenConnection("NotItem");
    const data = await dataTest.List();

    expect(data).toEqual([]);
  });
});
