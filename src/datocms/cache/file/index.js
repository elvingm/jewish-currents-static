import { outputJson, pathExists, readJson } from 'fs-extra';

import Cache from '../index.js';

const defaults = { filepath: '.data.json', disable: false, refresh: false };

export default class FileCache extends Cache {
  constructor({ filepath = '.data.json', disable = false, refresh = false } = defaults) {
    super();
    this.options = { filepath, disable, refresh };
  }

  // read returns parsed json or null
  async read() {
    if (this.options.refresh) return null;
    if (this.options.disable) return null;

    const cacheExists = await pathExists(this.options.filepath);
    if (cacheExists) {
      console.log('reading json...');
      const data = await readJson(this.options.filepath);
      return data;
    }

    return null;
  }

  // write object to Cache, returns a promise
  async write(data) {
    if (!this.options.disable) await outputJson(this.options.filepath, data);
  }
}
