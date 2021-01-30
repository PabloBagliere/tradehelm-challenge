import Mock from "Utils/mockLocalStorage";
import localStorage from "Utils/localStorage";
import Item from "types/Item";

global.localStorage = new Mock();

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
  expect(new localStorage()).toBeInstanceOf(localStorage);
});

describe("different ways to create item in localStorage", () => {
  test("Create item in localStorage", async () => {
    const dataTest = new localStorage();

    await dataTest.OpenConnection("Create");
    const data = await dataTest.Create(itemTest);

    expect(data).toBe(itemTest);
  });

  test("Create item in localStorage without initializing ", async () => {
    const dataTest = new localStorage();

    try {
      await dataTest.Create(itemTest);
    } catch (error) {
      expect(error).toEqual("No inicializado");
    }
  });
  test("Create item in localStorage duplicate", async () => {
    const dataTest = new localStorage();

    await dataTest.OpenConnection("Duplicate");
    try {
      await dataTest.Create(itemTest);
      await dataTest.Create(itemTest);
    } catch (error) {
      expect(error).toEqual("Error item duplicado");
    }
  });
});

describe("different ways to delete item in localStorage", () => {
  test("Delete item in localStorage", async () => {
    const dataTest = new localStorage();

    await dataTest.OpenConnection("Delete");
    await dataTest.Create(itemTest);
    const data = await dataTest.Delete(itemTest);

    expect(data).toBe(itemTest);
  });
  test("Delete item in localStorage without initializing", async () => {
    const dataTest = new localStorage();

    try {
      await dataTest.Delete(itemTest);
    } catch (error) {
      expect(error).toEqual("No inicializado");
    }
  });
  test("Delete iten not exist in localStorage", async () => {
    const dataTest = new localStorage();

    await dataTest.OpenConnection("NotExist");
    try {
      await dataTest.Delete(itemTest);
    } catch (error) {
      expect(error).toEqual("Error: No existe el item");
    }
  });
});

describe("different ways to list item in localStorage", () => {
  test("List item in localStorage", async () => {
    const dataTest = new localStorage();

    await dataTest.OpenConnection("List");
    for await (const item of itemsList) {
      dataTest.Create(item);
    }
    const data = await dataTest.List();

    expect(data).toEqual(itemsList);
  });
  test("to list item in localStorage without initializing", async () => {
    const dataTest = new localStorage();

    try {
      await dataTest.List();
    } catch (error) {
      expect(error).toEqual("No inicializado");
    }
  });

  test("list without item in localStorage", async () => {
    const dataTest = new localStorage();

    await dataTest.OpenConnection("NotItem");
    const data = await dataTest.List();

    expect(data).toEqual([]);
  });
});
