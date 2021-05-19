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
