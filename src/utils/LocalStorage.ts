type Option = {
  immutable: boolean;
};

/**
 * wrapper for window.localStorage
 * @constructor
 * @param {string} key - unique key to store your datas.
 * @param {Object} Option -
 * @param {string} option.immutable - helper for migration and if you want your key to change over app's version. Default false, your key will be prefixed with __STORAGE_VERSION__ from ./vite.config.ts file.
 */
class LocalStorage {
  private _key: string;
  constructor(key: string, option?: Option) {
    if (option?.immutable) this._key = `${key}`;
    else this._key = `${__STORAGE_VERSION__}${key}`;
  }

  get key(): string {
    return this._key;
  }

  get data(): any {
    const data = localStorage.getItem(this._key) || "";
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  set data(data: any) {
    if (typeof data === "object") {
      localStorage.setItem(
        this._key,
        JSON.stringify({ ...this.data, ...data })
      );
    } else {
      localStorage.setItem(this._key, data);
    }
  }

  flush(): void {
    localStorage.removeItem(this._key);
  }
}

export default LocalStorage;
