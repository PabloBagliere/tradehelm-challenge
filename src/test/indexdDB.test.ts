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

test("Create item in indexdDB", async () => {
  const dataTest = new IndexedDB();

  await dataTest.OpenConnection("Create");
  const data = await dataTest.Create(itemTest);

  expect(data).toBe(itemTest);
});

test("Delete item in IndexedDB", async () => {
  const dataTest = new IndexedDB();

  await dataTest.OpenConnection("Delete");
  await dataTest.Create(itemTest);
  const data = await dataTest.Delete(itemTest);

  expect(data).toBe(itemTest);
});

test("List item in IndexedDB", async () => {
  const dataTest = new IndexedDB();

  await dataTest.OpenConnection("List");
  for await (const item of itemsList) {
    dataTest.Create(item);
  }

  const data = await dataTest.List();

  expect(data).toEqual(expect.arrayContaining(itemsList));
});
