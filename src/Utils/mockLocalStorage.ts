export default class mockLocalStore implements Storage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
  length!: number;
  key(index: number): string | null {
    return index.toString();
  }
  constructor() {
    this.store = {};
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string | number): void {
    delete this.store[key];
  }
}
