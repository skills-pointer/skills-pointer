class Database {
  constructor(name) {
    this.name = name;
    if (!localStorage[this.name]) {
      this._set({});
    }
  }

  get(key) {
    return this._get()[key];
  }
  set(key, value) {
    let data = this._get();
    data[key] = value;
    this._set(data);
  }

  _get() {
    return JSON.parse(localStorage[this.name]);
  }
  _set(data) {
    return localStorage[this.name] = JSON.stringify(data);
  }
}