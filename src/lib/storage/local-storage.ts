type LocalStorageRecord = { [key: string]: any };

export class LocalStorage {
  /*
    Chrome拡張で使用できるローカルストレージを操作する
    全てCallback関数を引数にとるのでPromiseで包んで直列化できるようにした
  */
  private storage: chrome.storage.StorageArea;
  constructor() {
    this.storage = chrome.storage.local;
  }

  async get(key: string): Promise<LocalStorageRecord> {
    return new Promise((resolve) => this.storage.get(key, resolve));
  }

  async getAll(): Promise<LocalStorageRecord[]> {
    return new Promise((resolve) =>
      this.storage.get((items) => {
        return resolve(items.items());
      })
    );
  }

  async set(key: string, value: string): Promise<void> {
    return new Promise((resolve) =>
      this.storage.set({ [key]: value }, () => resolve())
    );
  }

  async remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      this.storage.remove(key, () => resolve());
    });
  }
}
