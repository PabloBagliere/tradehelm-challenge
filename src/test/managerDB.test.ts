import "fake-indexeddb/auto";
import IndexedDB from "Utils/indexedDB";
import ManagerDB from "services/managerDB";

test("Must initialize an IndexdDB", async () => {
  expect(await ManagerDB()).toBeInstanceOf(IndexedDB);
});

// TODO: Test de localstorage
// test("Must initialize an LocalStorage", async () => {
//   expect(await ManagerDB()).toBeInstanceOf(LocalStorage);
// });

test("Multiple calls to the same reference", async () => {
  const manager1 = await ManagerDB();
  const manager2 = await ManagerDB();

  expect(manager1).toEqual(manager2);
});
