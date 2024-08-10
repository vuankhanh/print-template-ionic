import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class StorageClientService {
  private _storage: Storage | null = null;
  private isReady: Promise<void>;
  constructor(private storage: Storage) {
    this.isReady = this.init();
  }

  private async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ensureReady() {
    await this.isReady;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async set(key: string, value: any) {
    await this.ensureReady();
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    await this.ensureReady();
    return await this._storage?.get(key);
  }

  async keys() {
    return await this._storage?.keys()
  }

  async length() {
    return await this._storage?.length();
  }
}
